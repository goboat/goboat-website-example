import create from 'zustand';

const useStore = create(() => {
  const isBrowser = typeof window !== 'undefined';
  return {
    viewport: {
      width: 400,
      height: 1000,
    },
    mobile:
      isBrowser &&
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator?.userAgent
      ),
  };
});
export default useStore;
