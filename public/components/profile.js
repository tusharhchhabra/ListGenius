$(() => {
  const $main = $('#main-content');
  window.userProfile = {};

  // Generate nav bar HTML
  function generateProfileHtml(user) {
    return `
    <section id="profile-section">
      <span class="content-heading">Profile</span>
      <div id="profileData">
        <input id="name" placeholder="Name" value="${user.name}">
        <input id="email" placeholder="Email Address" value="${user.email_adress}">
      </div>
      <button class="save-profile-button">Save</button>
    </section>`;
  }

  function updateProfileView(user) {
    $profile.empty();
    const profileHtml = generateProfileHtml(user);
    $profile.append(profileHtml);
  }
  window.userProfile.update = updateProfileView;

  $('.profileData').on('input', function() {
    if (this.value.length > 0) {
      $('.save-profile-button').show();
    } else {
      $('.save-profile-button').hide();
    }
  });

  $main.on("click", ".save-profile-button", function() {
    const userName = $main.find('#name').val();
    const userEmail = $main.find('#email').val();
    updateUser({ userName, userEmail });
  });
});
