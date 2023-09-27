$(() => {
  const $main = $('#main-content');
  window.newItemButton = {};

  // Generate nav bar HTML
  function generateNewItemButtonHtml(user) {
    return `
      <button id="new-item-button">
        New Item
      </button>
    `;
  }

  // Update header (nav bar)
  function addNewItemButton() {
    if ($main.find('#new-item-button')) {
      return;
    }
    const buttonHtml = generateNewItemButtonHtml();
    $main.append(buttonHtml);
  }
  window.newItemButton.add = addNewItemButton;

  function removeNewItemButton() {
    $main.find('#new-item-button').remove();
  }
  window.newItemButton.remove = removeNewItemButton;

  // Clicking takes the user to New Item Panel
  $('#new-item-button').on("click", function() {
    views_manager.show("newItemPanel");
  });
});

