// Firebase configuration
var firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

document.getElementById('uploadButton').onclick = function() {
    document.getElementById('imageUpload').click();
};

document.getElementById('imageUpload').onchange = function(event) {
    var file = event.target.files[0];
    var storageRef = firebase.storage().ref('profileImages/' + file.name);
    var uploadTask = storageRef.put(file);

    uploadTask.on('state_changed', function(snapshot) {
        // Handle progress
    }, function(error) {
        console.error('Upload failed:', error);
    }, function() {
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            document.getElementById('profileImage').src = downloadURL;
        });
    });
};

document.getElementById('profileForm').onsubmit = function(event) {
    event.preventDefault();

    var profileData = {
        name: document.getElementById('name').value,
        fatherName: document.getElementById('fatherName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        location: document.getElementById('location').value,
        experience: document.getElementById('experience').value,
        education: document.getElementById('education').value,
        gender: document.getElementById('gender').value,
        dob: document.getElementById('dob').value,
        imageUrl: document.getElementById('profileImage').src
    };

    firebase.database().ref('profiles/' + firebase.auth().currentUser.uid).set(profileData)
        .then(function() {
            alert('Profile saved successfully');
        })
        .catch(function(error) {
            console.error('Error saving profile:', error);
        });
};

document.getElementById('downloadCV').onclick = function() {
    firebase.database().ref('profiles/' + firebase.auth().currentUser.uid).once('value').then(function(snapshot) {
        var profileData = snapshot.val();
        if (profileData) {
            const { jsPDF } = window.jspdf;

            var doc = new jsPDF();

            doc.setFontSize(22);
            doc.text("Curriculum Vitae", 20, 20);

            doc.setFontSize(16);
            doc.text("Name: " + profileData.name, 20, 40);
            doc.text("Father Name: " + profileData.fatherName, 20, 50);
            doc.text("Email: " + profileData.email, 20, 60);
            doc.text("Phone: " + profileData.phone, 20, 70);
            doc.text("Location: " + profileData.location, 20, 80);
            doc.text("Experience: " + profileData.experience, 20, 90);
            doc.text("Education: " + profileData.education, 20, 100);
            doc.text("Gender: " + profileData.gender, 20, 110);
            doc.text("Date of Birth: " + profileData.dob, 20, 120);

            if (profileData.imageUrl) {
                var img = new Image();
                img.src = profileData.imageUrl;
                img.onload = function() {
                    doc.addImage(img, 'JPEG', 150, 20, 50, 50);
                    doc.save('cv.pdf');
                };
            } else {
                doc.save('cv.pdf');
            }
        }
    });
};
