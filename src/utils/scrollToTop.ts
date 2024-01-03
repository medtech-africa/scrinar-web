const isBrowser = () => typeof window !== 'undefined'; //The approach recommended by Next.js

function scrollToTop() {
    console.log("first")
    if (!isBrowser()) return;
    console.log("second")
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

export {scrollToTop}