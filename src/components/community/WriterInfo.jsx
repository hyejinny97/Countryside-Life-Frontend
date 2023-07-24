import { strToDate } from '@utils';

function WriterInfo({ nickName, createdTime }) {
    return (
        <div className="WriterInfo">
            <p className="WriterInfo__username">{nickName}</p>
            <p className="WriterInfo__created">{strToDate(createdTime)}</p>
        </div>
    );
}

export default WriterInfo;