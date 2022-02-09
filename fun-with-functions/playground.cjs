const strict = require('assert/strict');

// 1. Write three binary functions, add , sub, and mul, that take
// two numbers and return their sum, difference, and product.
function add(x, y) {
  return x + y;
}

function sub(x, y) {
  return x - y;
}

function mul(x, y) {
  return x * y;
}

strict.equal(add(3, 4), 7);
strict.equal(sub(7, 3), 4);
strict.equal(mul(3, 4), 12);

// 2. Write a function identityf that takes an argument and returns
// a function that returns that argument.
function identityf(x) {
  return () => x;
}

const identityfResultFunction = identityf(1);

strict.equal(identityfResultFunction(), 1);

// 3. Write a function addf that adds from two invocations.
function addf(x) {
  return y => x + y;
}

strict.equal(addf(3)(4), 7);

// 4. Write a function curry that takes a binary function and an
// argument, and returns a function that can take a second argument.
function curry(fn, x) {
  return y => fn(x, y);
}

strict.equal(curry(add, 3)(4), 7);

// 5. Write a function curryr that takes a binary function and a
// second argument, and returns a function that can take a first argument.
function curryr(fn, y) {
  return x => fn(x, y);
}

strict.equal(curryr(sub, 3)(7), 4);

// 6. Write a function liftf that takes a binary function, and makes
// it callable with two invocations.
function liftf(fn) {
  return x => y => fn(x, y);
}

strict.equal(liftf(mul)(3)(4), 12);

// 7. Without writing any new functions, show four ways to create
// the inc function.

/*
let inc = addf(1);
let inc = curry(add, 1);
let inc = curryr(add, 1);
let inc = liftf(add)(1);
*/

// 8. Write a function twice that takes a binary function and returns
// a unary function that passes its argument to the binary function
// twice.
function twice(fn) {
  return xy => fn(xy, xy);
}

strict.equal(twice(add)(3), 6);

// 9. Write reverse, a function that reverses the arguments of
// a binary function.
function reverse(fn) {
  return (x, y) => fn(y, x);
}

strict.equal(reverse(sub)(7, 3), -4);

// 10. Write a function composeu that takes two unary functions and
// returns a unary function that calls them both.
function composeu(fn1, fn2) {
  return x => fn2(fn1(x));
}

const double = curryr(mul, 2);
const square = twice(mul);

strict.equal(composeu(double, square)(5), 100);

// 11. Write a function composeb that takes two binary functions
// and returns a function that calls them both.
function composeb(fn1, fn2) {
  return (x, y, z) => fn2(fn1(x, y), z);
}

strict.equal(composeb(add, mul)(3, 4, 7), 49);

// 12. Write a limit function that allows a function to be called
// a limited number of times.
function limit(fn, maxCallsCount) {
  let callsCount = 0;

  return (...args) => {
    if (callsCount === maxCallsCount) return;

    callsCount++;

    return fn(...args);
  };
}

const limitedAdd = limit(add, 1);

strict.equal(limitedAdd(3, 4), 7);
strict.equal(limitedAdd(3, 4), undefined);

// 13. Write a from factory that produces a generator that will
// produce a series of values.
function from(x) {
  let value = x;

  return () => value++;
}

const index0 = from(0);

strict.equal(index0(), 0);
strict.equal(index0(), 1);
strict.equal(index0(), 2);

// 14. Write a to factory that takes a generator and an end value,
// and returns a generator that will produce numbers up to but not including that limit.
function to(generator, x) {
  return () => {
    let value = generator();

    return value < x ? value : undefined;
  };
}

const index1 = to(from(2), 4);

strict.equal(index1(), 2);
strict.equal(index1(), 3);
strict.equal(index1(), undefined);

// 15. Write a fromTo factory that produces a generator that will
// produce values in a range.
function fromTo(x, y) {
  return to(from(x), y);
}

const index2 = fromTo(0, 3);

strict.equal(index2(), 0);
strict.equal(index2(), 1);
strict.equal(index2(), 2);
strict.equal(index2(), undefined);

// 16. Write an element factory that takes an array and a generator
// and returns a generator that will produce elements from the array.
function element0(arr, generator) {
  return () => {
    const index = generator();

    if (index === undefined) return undefined;

    return arr[index];
  };
}

const el0 = element0(['a', 'b', 'c', 'd'], fromTo(1, 3));

strict.equal(el0(), 'b');
strict.equal(el0(), 'c');
strict.equal(el0(), undefined);

// 17. Modify the element factory so that the generator argument
// is optional. If a generator is not provided, then each of the
// elements of the array will be produced.
function element1(arr) {
  return element0(arr, fromTo(0, arr.length));
}

let el1 = element1(['a', 'b', 'c', 'd']);

strict.equal(el1(), 'a');
strict.equal(el1(), 'b');
strict.equal(el1(), 'c');
strict.equal(el1(), 'd');
strict.equal(el1(), undefined);

// 18. Write a collect factory that takes a generator and an array
// and produces a generator that will collect the results in the
// array.
function collect(generator, arr) {
  return () => {
    const value = generator();

    if (value !== undefined) {
      arr.push(value);
    }

    return value;
  };
}

const arr0 = [];
const col = collect(fromTo(0, 2), arr0);

strict.equal(col(), 0);
strict.equal(col(), 1);
strict.equal(col(), undefined);
strict.deepEqual(arr0, [0, 1]);

// 19. Write a filter factory that takes a generator and a predicate
// and produces a generator that produces only the values approved
// by the predicate.
function filter(generator, predicate) {
  return () => {
    let value = generator();

    while (value !== undefined) {
      if (predicate(value)) {
        return value;
      }

      value = generator();
    }
  };
}

const fil = filter(fromTo(0, 5), x => x % 3 === 0);

strict.equal(fil(), 0);
strict.equal(fil(), 3);
strict.equal(fil(), undefined);

// 20. Write a concat factory that takes two generators and produces
// a generator that combines the sequences.
function concat(generator1, generator2) {
  return () => {
    const value = generator1();

    if (value !== undefined) {
      return value;
    }

    return generator2();
  };
}

const con = concat(fromTo(0, 3), fromTo(0, 2));

strict.equal(con(), 0);
strict.equal(con(), 1);
strict.equal(con(), 2);
strict.equal(con(), 0);
strict.equal(con(), 1);
strict.equal(con(), undefined);

// 21. Write a repeat function that takes a generator and calls it
// until it returns undefined.
function repeat(generator) {
  let value;

  do {
    value = generator();
  } while (value !== undefined);
}

const arr1 = [];

repeat(collect(fromTo(0, 4), arr1));

strict.deepEqual(arr1, [0, 1, 2, 3]);

// 22. Write a map function that takes an array and a unary function,
// and returns an array containing the result of passing each element
// to the unary function. Use the repeat function.
function map(arr, fn) {}

// 23. Write a reduce function that takes an array and a binary
// function, and returns a single value. Use the repeat function.
function reduce(arr, fn) {}

// 24. Make a gensymf factory that makes a unique symbol generator.
function gensymf(symbol) {
  let i = 0;

  return () => {
    i++;

    return `${symbol}${i}`;
  };
}

const geng0 = gensymf('G');
const genh0 = gensymf('H');

strict.equal(geng0(), 'G1');
strict.equal(geng0(), 'G2');
strict.equal(genh0(), 'H1');
strict.equal(genh0(), 'H2');

// 25. Write a gensymff factory factory that takes a factory function
// and a seed and returns a gensymf.
function gensymff(factory, seed) {
  return sym => {
    const generator = factory(seed);

    return () => `${sym}${generator()}`;
  };
}

const gensymf0 = gensymff(from, 2);
const geng1 = gensymf0('G');
const genh1 = gensymf0('H');

strict.equal(geng1(), 'G2');
strict.equal(geng1(), 'G3');
strict.equal(genh1(), 'H2');
strict.equal(genh1(), 'H3');

// 26. Make a fibonaccif factory that returns a generator that
// will produce the fibonacci sequence.
function fibonaccif(x1, x2) {
  const numbers = [x1, x2];

  let index = 0;

  return () => {
    if (!numbers[index]) {
      numbers.push(numbers[numbers.length - 1] + numbers[numbers.length - 2]);
    }

    return numbers[index++];
  };
}

const fib = fibonaccif(0, 1);

strict.deepEqual(fib(), 0);
strict.deepEqual(fib(), 1);
strict.deepEqual(fib(), 1);
strict.deepEqual(fib(), 2);
strict.deepEqual(fib(), 3);
strict.deepEqual(fib(), 5);

// 27. Write a counter constructor that returns an object containing
// two functions that implement an up/down counter, hiding the
// counter.
function counter(initialValue) {
  let value = initialValue;

  return {
    up: () => ++value,
    down: () => --value
  };
}

const counter0 = counter(10);

strict.equal(counter0.up(), 11);
strict.equal(counter0.down(), 10);
strict.equal(counter0.down(), 9);

// 28. Make a revocable constructor that takes a function, and
// returns an object containing an invoke method that can invoke
// the function, and a revoke method that disables the invoke method.
function revocable(fn) {
  let enabled = true;

  return {
    invoke: (...args) => (enabled ? fn(...args) : undefined),
    revoke: () => {
      enabled = false;
    }
  };
}

const revocableAdd = revocable(add);

strict.equal(revocableAdd.invoke(3, 4), 7);

revocableAdd.revoke();

strict.equal(revocableAdd.invoke(3, 4), undefined);

// 29. Write a function m that takes a value and an optional source
// string and returns them in an object.
function m(value, source) {
  return {
    value,
    source: source || value
  };
}

strict.deepEqual(m(1), { value: 1, source: 1 });
strict.deepEqual(m(Math.PI, 'pi'), { value: Math.PI, source: 'pi' });

// 30. Write a function addn that adds two n objects and returns an m object.
function addm(n1, n2) {
  return {
    value: n1.value + n2.value,
    source: `(${n1.source}+${n2.source})`
  };
}

strict.deepEqual(addm(m(3), m(4)), { value: 7, source: '(3+4)' });
strict.deepEqual(addm(m(1), m(Math.PI, 'pi')), {
  value: Math.PI + 1,
  source: '(1+pi)'
});

// 31. Write a function liftm that takes a binary function and
// a string and returns a function that acts on m objects.
function liftm() {}

// 32. Modify function liftm so that the functions it produces
// can accept arguments that are either numbers or m objects.

// 33. Write a function exp that evaluates simple array expressions.
function exp(arr) {
  return arr[0](...arr.slice(1));
}

strict.equal(exp([mul, 3, 4]), 12);

// 34. Modify exp to evaluate nested array expressions.

// 35. Write a function addg that adds from many invocations, until
// it sees an empty invocation.
function addg(x) {
  if (x === undefined) return;

  let result = x;

  const fn = y => {
    if (y === undefined) {
      return result;
    } else {
      result += y;

      return fn;
    }
  };

  return fn;
}

strict.equal(addg(), undefined);
strict.equal(addg(2)(), 2);
strict.equal(addg(2)(7)(), 9);
strict.equal(addg(3)(0)(4)(), 7);
strict.equal(addg(1)(2)(4)(8)(), 15);

// 36. Write a function liftg that will take a binary function and
// apply it to many invocations.
function liftg(fn) {
  return x => {
    if (x === undefined) return;

    let result = x;

    const _fn = y => {
      if (y === undefined) {
        return result;
      } else {
        result = fn(result, y);

        return _fn;
      }
    };

    return _fn;
  };
}

strict.equal(liftg(mul)(), undefined);
strict.equal(liftg(mul)(2)(), 2);
strict.equal(liftg(mul)(2)(7)(), 14);
strict.equal(liftg(mul)(3)(0)(4)(), 0);
strict.equal(liftg(mul)(1)(2)(4)(8)(), 64);

strict.equal(liftg(add)(), undefined);
strict.equal(liftg(add)(2)(), 2);
strict.equal(liftg(add)(2)(7)(), 9);
strict.equal(liftg(add)(3)(0)(4)(), 7);
strict.equal(liftg(add)(1)(2)(4)(8)(), 15);

// 37. Write a function arrayg that will build an array from many
// invocations.
function arrayg(x) {
  if (x === undefined) return [];

  const result = [x];

  const fn = y => {
    if (y === undefined) {
      return result;
    } else {
      result.push(y);

      return fn;
    }
  };

  return fn;
}

strict.deepEqual(arrayg(), []);
strict.deepEqual(arrayg(3)(), [3]);
strict.deepEqual(arrayg(3)(4)(5)(), [3, 4, 5]);

// 38. Make an objectify factory that takes an array of property
// names and returns a constructor that takes values and returns
// an object.
function objectify(...keysArr) {
  return (...valuesArr) =>
    keysArr.reduce(
      (acc, key, index) => ({
        ...acc,
        [key]: valuesArr[index]
      }),
      {}
    );
}

strict.deepEqual(objectify('date', 'marry', 'kill')('butterfly', 'unicorn', 'monster'), {
  date: 'butterfly',
  marry: 'unicorn',
  kill: 'monster'
});

// 39. Make a join factory that takes a function and generators
// that provide arguments to the function.
function join(fn, ...generators) {
  return () => {
    const args = generators.map(generator => generator());

    return fn(...args);
  };
}

let fo = join(objectify('number', 'fibonacci'), from(0), fibonaccif(4, 5));

strict.deepEqual(fo(), { number: 0, fibonacci: 4 });
strict.deepEqual(fo(), { number: 1, fibonacci: 5 });
strict.deepEqual(fo(), { number: 2, fibonacci: 9 });

// 40. Make a continuize factory that takes a function, and returns
// a function that takes a callback and an argument.
function continuize(fn) {
  return (cb, x) => {
    cb('<continuize>');

    return fn(x);
  };
}

strict.equal(continuize(Math.sqrt)(console.log, 81), 9);
