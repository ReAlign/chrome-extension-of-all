const loginLiveAdmin = () => {
  if (window.location.href === 'https://live-admin.fe.qa1fdg.net/') {
    document.cookie =
      'session=6hnZ9zqqHGCmenWLg1T6s1; expires=Fri, 31 Dec 2068 23:59:59 GMT; path=/';
    window.location.reload();
  }
};

export const runModules = () => {
  loginLiveAdmin();
};
