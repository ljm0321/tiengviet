import { useRouter } from 'next/router';
import React, {useEffect, useRef} from 'react';

const Utterances: React.FC = () => {
    const router = useRouter();

    const commentsRef = useRef<HTMLElement | null>(null);
    useEffect(() => {
        const scriptEl = document.createElement('script');
        scriptEl.src = 'https://utteranc.es/client.js';
        scriptEl.async = true;
        scriptEl.crossOrigin = 'anonymous';
        scriptEl.setAttribute('repo', 'ljm0321/vietComment');
        scriptEl.setAttribute('issue-term', 'pathname');
        scriptEl.setAttribute('theme', `github-light`);
        scriptEl.setAttribute('label', 'comment');
    
        commentsRef.current?.appendChild(scriptEl);
    }, [router.query]);
    
    return (
        <><section ref={commentsRef} /></>
    )
};

export default Utterances;
