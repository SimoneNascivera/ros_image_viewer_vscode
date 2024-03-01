const vscode = require('vscode');
const { spawn } = require('child_process');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

function activate(context) {
    let disposable = vscode.commands.registerCommand('ros-image-view.viewImage', selectTopicAndShow);

    context.subscriptions.push(disposable);
}

async function selectTopicAndShow(){
    const process = spawn('rosrun', ['web_video_server', 'web_video_server']);

    process.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
    });

    process.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
    });

    process.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    });
    
    const { stdout, stderr } = await exec('rostopic list -v | grep sensor_msgs/Image | grep publisher | awk \'{print $2}\'');
    const topics = stdout.split('\n');
    topics.pop();

    let options = {
        placeHolder: "Select rostopic",
    };

    const choosenTopic = await vscode.window.showQuickPick(topics, options);
    
    const panel = vscode.window.createWebviewPanel(
        'rosImage',
        'ROS Image: ' + choosenTopic,
        vscode.ViewColumn.One,
        {
            enableScripts: true,
        }
    );

    panel.webview.html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ROS Image</title>
        <style>
            html, body
            {
                height: 100%;
                margin:0;
                padding:0;
            }

            div {
                position:relative;
                height: 100%;
                width:100%;
            }

            div img {
                position:absolute;
                top:0;
                left:0;
                right:0;
                bottom:0;
                margin:auto;
            }
        </style>
    </head>
    <body>
        <div id="image"></div>
        <script>
            document.getElementById('image').innerHTML = \`<img src="http://localhost:8080/stream?topic=${choosenTopic}" alt="ROS Image">\`;
        </script>
    </body>
    </html>
    `;
    
    
    panel.onDidDispose(
        () => {
        // When the panel is closed, cancel any future updates to the webview content
        process.kill('SIGTERM');
        },
        null,
    );

    //exec('rostopic list -v | grep sensor_msgs/Image | grep publisher | awk \'{print $2}\'', (error, stdout, stderr) => {
    //    const topics = stdout.split('\n');
    //});
        
            
        
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}