import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>&copy; 2024 Chef Memo. All rights reserved.</p>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "var(--white-color)",
    borderTop: "1px solid var(--main-color)",
    padding: "15px 0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "var(--dark-color)",
    fontSize: "16px",
    fontFamily: "'Playfair Display', 'Cormorant Garamond', serif",
    margin: 0,
  }
};

export default Footer;
