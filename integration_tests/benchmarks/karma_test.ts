/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

import {MatmulGPUBenchmark} from './matmul_benchmarks';

const BENCHMARK_RUNS = 100;

function nextTick(): Promise<void> {
  return new Promise(resolve => setTimeout(resolve));
}

describe('benchmarks', () => {
  beforeAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000;
  });

  it('test', async done => {
    const matmulGPU = new MatmulGPUBenchmark();

    const sizes = [1, 100, 400, 1000];
    console.log('-------------matmul benchmark------------');
    console.log('UA: ' + navigator.userAgent);
    for (let i = 0; i < sizes.length; i++) {
      const size = sizes[i];

      let total = 0;
      for (let j = 0; j < BENCHMARK_RUNS; j++) {
        const result = await matmulGPU.run(size);
        total += result / BENCHMARK_RUNS;
        await nextTick();
      }

      console.log(`[${size}]: ${total}`);
    }
    console.log('-----------------------------------------');
    done();
  });
});
