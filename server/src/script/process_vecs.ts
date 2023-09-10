import fs from 'fs';
import { promisify } from 'util';
import readline from 'readline';
import { normalize } from 'path';
import { getServices, initServices } from '~/service/services';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from '~/app.module';

const isHangul = (text: string): boolean => {
  return /^[\u3130-\u318F\uAC00-\uD7A3]+$/.test(text);
};

const loadDic = async (path: string): Promise<Set<string>> => {
  const data = await promisify(fs.readFile)(path, 'utf-8');
  const lines = data.split('\n');
  const words = new Set<string>();

  for (const line of lines) {
    const word = normalize(line.trim());
    if (isHangul(word)) {
      words.add(word);
    }
  }

  return words;
};

const countLines = async (filePath: string): Promise<number> => {
  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity,
  });

  let lines = 0;
  for await (const _ of rl) {
    lines++;
  }

  return lines - 1;
};

const floatArrayToBuffer = (floats: number[]): Buffer => {
  const buffer = Buffer.alloc(floats.length * 4); // Assuming 32-bit floats
  floats.forEach((float, index) => {
    buffer.writeFloatLE(float, index * 4);
  });
  return buffer;
};

// const getLastInsertedWord = async (): Promise<string | null> => {
//   const lastInsertedWord =
//     await getServices().prisma.primaryClient.word.findFirst({
//       orderBy: {
//         id: 'desc',
//       },
//       select: {
//         word: true,
//       },
//     });
//   return lastInsertedWord?.word || null;
// };

const run = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await initServices(app);

  const normalWords = await loadDic('data/ko-aff-dic-0.7.92/ko_filtered.txt');
  console.log('# words in dictionary:', normalWords.size);

  const validNearest: string[] = [];
  const validNearestMat: number[][] = [];
  let eliminated = 0;
  const checkedWords = new Set<string>();

  const totalLines = await countLines('data/cc.ko.300.vec');

  const rl = readline.createInterface({
    input: fs.createReadStream('data/cc.ko.300.vec'),
    crlfDelay: Infinity,
  });

  let progress = 0;

  // const lastWordInserted = await getLastInsertedWord();
  // let foundLastWord = !lastWordInserted;

  for await (const line of rl) {
    const words = line.trim().split(' ');
    const word = normalize(words[0]);

    // if (!foundLastWord) {
    //   if (word === lastWordInserted) {
    //     foundLastWord = true;
    //   }
    //   continue;
    // }

    if (!isHangul(word) || checkedWords.has(word)) {
      eliminated++;
    } else {
      const vec = words.slice(1).map((w1) => parseFloat(w1));

      if (normalWords.has(word)) {
        validNearest.push(word);
        validNearestMat.push(vec);
      }

      try {
        await getServices().prisma.primaryClient.word.create({
          data: {
            word: word,
            vec: floatArrayToBuffer(vec),
          },
        });
      } catch (error) {
        console.error(`Error inserting word "${word}": ${error}`);
      }

      checkedWords.add(word);
    }

    progress++;
    if (progress % 1000 === 0) {
      console.log(`Processed ${progress}/${totalLines} words.`);
    }
  }

  console.log('invalid:', eliminated);
  console.log(
    'valid nearest shape:',
    validNearestMat.length,
    validNearestMat[0]?.length || 0,
  );

  fs.writeFileSync(
    'data/valid_nearest.dat',
    JSON.stringify({ validNearest, validNearestMat }),
  );

  console.log('done writing matrix');
};

run().then(() => {
  console.log('DONE');
  process.exit(0);
});
