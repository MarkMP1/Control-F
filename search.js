var pog;

function generate_shift_table(pattern) {
  var skip_list;
  skip_list = {};

  for (var i = 0, _pj_a = pattern.length; i < _pj_a; i += 1) {
    skip_list[pattern[i]] = Math.max(1, pattern.length - i - 1);
  }

  return skip_list;
}

function get(object, key, default_value) {
    var result = object[key];
    return (typeof result !== "undefined") ? result : default_value;
}

function boyer_moore_search(source, pattern) {
  var answer, bad_char, i, j, shift, skips;
  bad_char = generate_shift_table(pattern);
  console.log(bad_char);
  i = pattern.length - 1;
  answer = [];

  while (i <= source.length - 1) {
    j = 0;

    while (j < pattern.length && pattern[pattern.length - j - 1] === source[i - j]) {
      j += 1;
    }

    if (j === pattern.length) {
      answer.push(i - pattern.length + 1);
      i += 1;
      continue;
    } else {
      shift = get(bad_char, source[i+j], pattern.length)

      if (shift === 0) {
        shift = pattern.length - 1;
      }

      skips = shift - j;
      i += skips;
    }
  }

  return answer;
}
