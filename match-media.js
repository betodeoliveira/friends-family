function checkBreakpoint(x) {
    if (x.matches) {
      // desktop code here
      window.location.reload();
    } else {
      // tablet & below code here
      window.location.reload();
    }
  }
  
  const matchMediaDesktop = window.matchMedia("(min-width: 992px)");
  checkBreakpoint(matchMediaDesktop);
  matchMediaDesktop.addListener(checkBreakpoint);