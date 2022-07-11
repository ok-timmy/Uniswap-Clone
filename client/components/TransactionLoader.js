import {css} from '@emotion/react';
import {MoonLoader} from 'react-spinners';

const style = {
    wrapper: 'text-black h-64 w-72 flex flex-col justify-center items-center',
    title: 'font-semibold text-xl mt-12'
}

const cssOverride = css`
display: block;
margin: 0 auto;
border-color: white;
`

const TransactionLoader = () => {
    return (
        <div className={style.wrapper}>
            <MoonLoader color={'#b4b4b4'} loading={true} css={cssOverride} size={50}/>
            <div className={style.title}>Transaction In Progress</div>
        </div>
    )
}

export default TransactionLoader;