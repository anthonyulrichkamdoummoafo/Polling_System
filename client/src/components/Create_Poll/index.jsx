import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Create_Poll = () => {
  const [title, setTitle] = useState("");
  const [candidates, setcandidates] = useState([]); // Default candidates
  const [showExtra, setShowExtra] = useState(false);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null); // To store the selected image file
  const [allowMultiplecandidates, setAllowMultiplecandidates] = useState(false);
  const [selectionType, setSelectionType] = useState("unlimited");
  const [exactSelection, setExactSelection] = useState("");

  const HandleSubmit = () => {
    axios
      .post("/api/pool", {
        title,
        description,
        candidates: candidates,
        image: "httpsasasas",
        status: false,
        creator: localStorage.getItem("userId"),
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data.msg);
      });
  };

  // useRef to trigger the hidden file input
  const fileInputRef = useRef(null);

  const handleAddOption = () => {
    setcandidates([...candidates, { value: "" }]);
  };

  const handleRemoveOption = (index) => {
    if (candidates.length > 2) {
      setcandidates(candidates.filter((_, i) => i !== index));
    } else {
      alert("At least two candidates are required.");
    }
  };

  const handleChangeOption = (index, event) => {
    const newcandidates = [...candidates];
    newcandidates[index].value = event.target.value;
    setcandidates(newcandidates);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim()) {
      alert("Poll title is required.");
      return;
    }

    if (candidates.some((option) => !option.value.trim())) {
      alert("All candidates must have a value.");
      return;
    }

    // Prepare the poll data
    const pollData = {
      title,
      description,
      candidates: candidates.map((option) => option.value),
      image,
    };

    console.log("Poll Created:", pollData);
    alert("Poll successfully created!");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  // Handle file input change event
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      // Optionally, you can display a preview or process the file here
      console.log("Selected image:", file);
    }
  };

  // Scroll event listener to change header style
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.login_container}>
        {/* Header with Logo and Navigation */}
        <header
          className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
        >
          <div className={styles.logo}>
            Pulse <span>Vote</span>
          </div>
          <nav className={styles.nav}>
            <Link to="/create-poll" className={styles.nav_item}>
              Create Poll
            </Link>
            <Link to="/browse-polls" className={styles.nav_item}>
              Browse Polls
            </Link>
            <Link
              to="/profile"
              className={styles.nav_item}
              onClick={handleLogout}
            >
              Logout
            </Link>
          </nav>
        </header>

        <div className={styles.containerBox}>
          <h1 className={styles.title}>Create a Poll</h1>
          <p className={styles.subtitle}>
            Complete the below fields to create your poll.
          </p>

          <form className={styles.container} onSubmit={handleSubmit}>
            {/* Title Input and Extra Fields */}
            <div className={styles.formGroup}>
              <input
                type="text"
                id="poll-title"
                name="title"
                placeholder="Type your question here"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              {/* Conditionally render link or extra fields */}
              {!showExtra ? (
                <a
                  href="#"
                  className={styles.addDescription}
                  onClick={(e) => {
                    e.preventDefault();
                    setShowExtra(true);
                  }}
                >
                  + Add description or image
                </a>
              ) : (
                <div className={styles.extraDetails}>
                  <textarea
                    placeholder="Add a description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={styles.descriptionTextarea}
                  />
                  <button
                    type="button"
                    className={styles.addImageBtn}
                    onClick={() => {
                      // Trigger a click on the hidden file input
                      fileInputRef.current && fileInputRef.current.click();
                    }}
                  >
                    Add Image
                  </button>
                  {/* Hidden file input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  {/* Optionally, show a preview of the selected image */}
                  {image && (
                    <div className={styles.imagePreview}>
                      <p>Selected Image:</p>
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Preview"
                        className={styles.previewImg}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Answer candidates */}
            <div className={styles.formGroup}>
              <label>Answer candidates</label>
              {candidates.map((option, index) => (
                <div key={index} className={styles.optionGroup}>
                  <input
                    type="text"
                    name={`option${index + 1}`}
                    placeholder={`Option ${index + 1}`}
                    value={option.value}
                    onChange={(event) => handleChangeOption(index, event)}
                    required
                  />
                  {candidates.length > 2 && (
                    <button
                      type="button"
                      className={styles.removeOption}
                      onClick={() => handleRemoveOption(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              className={styles.addOption}
              onClick={handleAddOption}
            >
              + Add option
            </button>
            {/* <a href="#" className={styles.addOther}>
              or Add &quot;Other&quot;
            </a> */}

            {/* Settings */}
            <div className={styles.settings}>
              <h3>Settings</h3>
              <div className={styles.settingItem}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="allowMultiplecandidates"
                    checked={allowMultiplecandidates}
                    onChange={(e) =>
                      setAllowMultiplecandidates(e.target.checked)
                    }
                  />
                  Allow selection of multiple candidates
                </label>

                {allowMultiplecandidates && (
                  <div className={styles.selectionDropdown}>
                    <select
                      value={selectionType}
                      onChange={(e) => setSelectionType(e.target.value)}
                      className={styles.dropdown}
                    >
                      <option value="unlimited">Unlimited</option>
                      <option value="exact">Exact Number</option>
                    </select>

                    {selectionType === "exact" && (
                      <input
                        type="number"
                        min="1"
                        value={exactSelection}
                        onChange={(e) => setExactSelection(e.target.value)}
                        className={styles.numberInput}
                        placeholder="Enter number"
                      />
                    )}
                  </div>
                )}
              </div>
              <div className={styles.settingItem}>
                <label>
                  <input type="checkbox" name="requireNames" />
                  Require participant names
                </label>
              </div>
              <div className={styles.settingItem}>
                <label htmlFor="voting-security">Voting security</label>
                <select id="voting-security" name="votingSecurity">
                  <option value="ip">One vote per IP address</option>
                  <option value="cookie">One vote per browser</option>
                </select>
              </div>

              <a href="#" className={styles.advancedSettings}>
                Show advanced settings
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={styles.createPollBtn}
              onClick={()=> HandleSubmit()}
            >
              Create poll
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create_Poll;
