$(() => {
  const $main = $('#main-content');
  window.userProfile = {};

  // Generate nav bar HTML
  function generateProfileHtml(user) {
    return `
    <div id="profile">
      <span class="profile-content-heading">Profile</span>
      <div id="profile-data">
        <input id="name" placeholder="Name" value="${user.name}">
        <input id="email" placeholder="Email Address" value="${user.email_address}">
      </div>
      <button class="save-profile-button">SAVE</button>
    </div>`;
  }

  function updateProfileView(user) {
    $profile.empty();
    const profileHtml = generateProfileHtml(user);
    $profile.append(profileHtml);
  }
  window.userProfile.update = updateProfileView;

  $main.on("input", "#name, #email", function() {
    const currentName = $('#name').val();
    const currentEmail = $('#email').val();

    if (currentName !== window.userProfile.name || currentEmail !== window.userProfile.email_address) {
      $('.save-profile-button').show();
    } else {
      $('.save-profile-button').hide();
    }
  });

  $main.on("click", ".save-profile-button", function() {
    const userName = $main.find('#name').val();
    const userEmail = $main.find('#email').val();
    updateUser({ userName, userEmail })
      .then(user => {
        if (user) {
          currentUser = user;
          window.header.update(user)
        }
      });
  });
});
