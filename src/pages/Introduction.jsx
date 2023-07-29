import { IntroSlider } from '@components/introduction';
import { Page } from '@components/ui';

function Introduction() {
    return (
        <>
            <IntroSlider />
            <Page className='Introduction'>
                <h1 className='Introduction__title'>시골라이프</h1>
                <p className='Introduction__content'>
                    시골라이프는 시골에서 생활하고 있는 사람들 뿐만 아니라, 
                    미래에 시골 생활을 꿈꾸는 사람들을 위한 커뮤니티 중심의 플랫폼으로,
                    시골에서의 삶과 정보를 공유하는 공간입니다.
                    <br /><br />
                    현재 시골 생활을 즐기고 있는 사람들 간의 의사소통 창구가 되어 주고
                    서로의 삶을 공유하며 공감할 수 있는 커뮤니티를 제공합니다.
                    <br /><br />
                    비록 현재 시골 생활을 즐기고 있지 않더라도, 
                    은퇴 후 시골에 내려와 노후를 준비하고자 하는 중장년층,
                    귀농/귀촌을 꿈꾸는 청년들, 
                    조용한 시골에서 재택근무를 하고자 하는 직장인들, 
                    공기 좋고 물 좋은 시골에서 한달 살기를 꿈꾸는 사람들은
                    시골라이프를 통해 시골에서의 생활 TIP을 얻을 수 있고 
                    시골 생활에 대한 궁금증을 간접적으로 해결할 수 있습니다.
                </p>
            </Page>
        </>
    );
}

export default Introduction;