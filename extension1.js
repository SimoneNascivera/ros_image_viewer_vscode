const vscode = require("vscode");

module.exports = { activate };

function activate(context) {
  const command1 = "test.helloWorld";
  let disposable1 = vscode.commands.registerCommand(
    command1,
    showQuickpickBasic
  );
  context.subscriptions.push(disposable1);

}

async function showQuickpickBasic() {
  let items = ["npm", "Yarn"];
  let options = {
    placeHolder: "Pick a package manager",
  };

  const result = await vscode.window.showQuickPick(items, options);

  // if no option was picked, result = `undefined`
  vscode.window.showInformationMessage(`Pick: ${result}.`);
}

async function showQuickpickMany() {
  // items are QuickPickItem objects
  let items = [
    { label: "Red", description: "Primary Color" },
    { label: "Blue", description: "Primary Color" },
    { label: "Yellow", description: "Secondary Color" },
    { label: "Pink", description: "Secondary Color" },
  ];
  let options = {
    placeHolder: "Pick colors for your palette",
    canPickMany: true,
  };

  const result = await vscode.window.showQuickPick(items, options);

  //turn result into a string with the colors as a comma-separated list
  let picks = result.map((pick) => pick.label).join(", ");
  vscode.window.showInformationMessage(`Picks: ${picks}.`);
}