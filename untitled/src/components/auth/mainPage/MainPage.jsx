import Header from "./header/Header";
import HeroSection from "./heroSection/heroSection";
import HowItWorks from "./HowItWorks/HowItWorks";
import AllCampaigns from "./AllCampaigns/AllCampaigns";

function MainPage() {
    return (
        <>
            <Header />
            <HeroSection/>
            <HowItWorks/>
            <AllCampaigns k={4} />

            =        </>
    );
}
export default MainPage;
