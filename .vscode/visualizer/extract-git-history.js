const fs = require('fs');
const { execSync } = require('child_process');

function extractGitCommits() {
    let skip = 0;
    const commits = [];
    const commitPattern = /Auto commit\|cnx:(\d+)\|\+(\d+)-(\d+)\n\s+\n([\s\S]+)/m;

    while (true) {
        const logOutput = execSync(`git log --skip=${skip} -n 100`).toString();
        if (!logOutput) break;

        logOutput.split('\n\ncommit ').forEach((block) => {
            const [commitHash, author, date, ...commitMessageLines] = block.split('\n');
            const fullCommitMessage = commitMessageLines.join('\n');
            const match = commitPattern.exec(fullCommitMessage);
            if (!match) return;
            const [fullText, successfulConnection, insertions, deletion, vsCodeExtensionsCsv] = match;
            const vsCodeExtensions = vsCodeExtensionsCsv.trim().split(',').filter(Boolean);
            commits.push({
                commitHash,
                author,
                date: date.replace('Date:', '').trim(),
                successfulConnections: parseInt(successfulConnection, 10),
                insertions: parseInt(insertions, 10),
                deletions: parseInt(deletion, 10),
                vsCodeExtensions,
            });
        });

        skip += 100;
    }

    commits.sort((a, b) => new Date(a.date) - new Date(b.date));
    fs.writeFileSync('./visualizer/commits.json', JSON.stringify(commits, null, 4));

    console.log(`Data saved as JSON`);
}

extractGitCommits();
