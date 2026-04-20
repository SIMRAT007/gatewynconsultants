export const smoothScrollTo = (targetId, event) => {
  if (event) {
    event.preventDefault();
  }
  
  const element = document.getElementById(targetId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
};

export const handleNavClick = (href, event) => {
  event.preventDefault();
  
  // Extract section ID from href (remove #)
  const targetId = href.replace('#', '');
  
  // Scroll to section without changing URL
  smoothScrollTo(targetId);
};
