const { exec } = require('child_process');
const { networkInterfaces } = require('os');

let successfulConnections = 0;

function checkNetworkConnection() {
    const nets = networkInterfaces();
    let isConnected = false;

    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            if (net.family === 'IPv4' && !net.internal) {
                isConnected = true;
                break;
            }
        }
        if (isConnected) break;
    }

    if (isConnected) {
        successfulConnections++;
    }
}

function checkCopilotExtensions(callback) {
    exec('code --list-extensions', (error, stdout, stderr) => {
        if (error || stderr) {
            callback(false, false);
            return;
        }
        callback(stdout);
    });
}

function getLinesChanged(callback) {
    exec('git diff --stat', (error, stdout, stderr) => {
        if (error || stderr) {
            callback(0);
            return;
        }
        const match = stdout.match(/(\d+) insertions?\(\+\), (\d+) deletions?\(-\)/);
        if (match) {
            const insertions = parseInt(match[1], 10);
            const deletions = parseInt(match[2], 10);
            callback(insertions, deletions);
        } else {
            callback(0, 0);
        }
    });
}

setInterval(checkNetworkConnection, 10000);

setInterval(function () {
    checkCopilotExtensions((extensions) => {
        getLinesChanged((insertions, deletions) => {
            const commitMessage = `Auto commit|cnx:${successfulConnections}|+${insertions}-${deletions}`;
            exec(
                `git add . && git commit --allow-empty -m "${commitMessage}" -m "${extensions.replaceAll(
                    '\n',
                    ',',
                )}" && git push`,
                (error, stdout, stderr) => {
                    if (error) {
                        console.error(`exec error: ${error}`);
                        return;
                    }
                    if (stderr) {
                        console.error(`stderr: ${stderr}`);
                        return;
                    }
                    console.log(`stdout: ${stdout}`);
                    successfulConnections = 0;
                },
            );
        });
    });
}, 10000);
