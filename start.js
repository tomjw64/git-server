process.on('SIGINT', function() {
  process.exit();
});

const express = require('express');
const gpusher = require('gpusher');
 
const port = 8000;
const app = express();
const repos = gpusher('/tmp/gpusher');
 
repos.on('push', p => {
  console.log(
    'pushed:\nbranch=%s\nrepo=%s\ncommit=%s',
    p.branch, p.commit, p.repo,
  );
  p.accept();
});

repos.on('tag', t => {
  console.log(
    'tagged:\nbranch=%s\nrepo=%s\ncommit=%s\nversion=%s',
    t.branch, t.commit, t.repo, t.version
  );
  t.accept();
});
 
app.all('/*', repos.handle.bind(repos)); 
 
app.listen(port, () => {
  console.log('listening on %d', port);
});
