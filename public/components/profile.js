$(() => {
  const $main = $('#main-content');
  window.profile = {};

  // Generate nav bar HTML
  function generateProfileHtml(user) {
    `<section id="profile">
      <span class="profile">Profile</span>
      <div id="profileData">
        <input id="name" placeholder="Name" data-id="${user.name}">
        <input id="email" placeholder="Email Address" data-id="${user.email_address}">
      </div>
      <button class="save-profile-button">Save</button>
    </section>`
  }

  function updateProfileView(user) {
    $profile.empty();
    console.log(user);
    const profileHtml = generateProfileHtml(user);
    $profile.append(profileHtml);
  }
  window.profile.update = updateProfileView;

  $('.profileData').on('input', function () {
    if (this.value.length > 0) {
        $('.save-profile-button').show();
    } else {
        $('.save-profile-button').hide();
    }
  });

  $main.on("click", ".save-profile-button", function() {
    const userName = $main.find('#name').val();
    const userEmail = $main.find('#email').val();
    updateUser(userName, userEmail);
  })
});
