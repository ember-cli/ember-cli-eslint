//✖ 1 problem (1 error, 0 warnings)
var sys = require('sys')
var exec = require('child_process').exec;
function puts(error, stdout, stderr) {
console.log('err', error);
  sys.puts(stdout);
}
exec("ember test", puts);
