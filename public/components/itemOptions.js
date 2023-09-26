$(() => {
  const $main = $('#main-content');
  window.items = {};

  function generateItemOptionsHtml(item) {
    return `
    <div id="item-options">
      <button class="edit" data-id="${item.id}">
      <button class="assign-category" data-id="${item.id}">
      <button class="delete" data-id="${item.id}">
    </div>
    `;
  }

  function addItemOptions(item) {
    const itemOptionsHtml = generateItemOptionsHtml(item);
    $main.append(itemsHtml);
  }
  window.items.addItemOptions = addItemOptions;
});
