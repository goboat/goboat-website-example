import Section from './section/section';
import Column from './section/column';
import Heading from './Heading';
import Paragraph from './Paragraph';
import List from './list/list';
import Image from './image/image';
import Button from '../sub-components/buttons/button';
import ButtonLink from '../sub-components/buttons/button-link';
import ButtonSocial from '../sub-components/buttons/button-social';
import ButtonGroup from '../sub-components/buttons/button-group';
import Embed from './Embed';
import ActiveCampaignForm from './active-campaign-form';
import SleeknoteInlineForm from './sleeknote-inline-form';
import Faq from './faq/faq';
import HeroSection from './hero-section/hero';
import Carousel from './carousel/carousel';
import GoBoatSpirit from './goboat-spirit/goboat-spirit';
import FeaturedContent from './featured-content';
import HowItWorks from './how-it-works-hero/how-it-works';
import EventsSection from './events/events';
import ArticlesBlock from './articles';
import LocationMap from './location-map/location-map';
import Locations from './locations/locations';
import HeaderStandard from './page-header/header';
import ReusableBlock from './reusable-block';
import SeeAlso from './see-also';
import Spacer from './spacer';
import FaqCollection from './faq-collection';
import MapBlock from './map/map-block';
import Quote from './quote/quote';
import FactBox from './fact-box/fact-box';
import PricingTable from './pricing-table/pricing-table';
import OpenLi from './openli/openli';
import FullWidthImage from './full-width-image';
import SectionTag from './section-tag';
import ImageGrid from './image-grid';

export const gutenbergComponents = {
  'next24hr/section': Section,
  'next24hr/column': Column,
  'sony/heading': Heading,
  'sony/paragraph': Paragraph,
  'core/paragraph': Paragraph,
  'core/list': List,
  'sony/image': Image,
  'goboat/button': Button,
  'goboat/button-link': ButtonLink,
  'goboat/button-social': ButtonSocial,
  'goboat/button-group': ButtonGroup,
  'sony/button': Button,
  'core/embed': Embed,
  'activecampaign-form/activecampaign-form-block': ActiveCampaignForm,
  'goboat/sleeknote-inline-form': SleeknoteInlineForm,
  'yoast/faq-block': Faq,
  'goboat/hero-section': HeroSection,
  'goboat/carousel': Carousel,
  'goboat/goboat-spirit': GoBoatSpirit,
  'goboat/featured-content': FeaturedContent,
  'goboat/how-it-works-hero': HowItWorks,
  'goboat/events': EventsSection,
  'goboat/articles': ArticlesBlock,
  'goboat/location-map': LocationMap,
  'goboat/locations': Locations,
  'goboat/page-header': HeaderStandard,
  'core/block': ReusableBlock,
  'goboat/see-also': SeeAlso,
  'goboat/spacer': Spacer,
  'goboat/faq-collection': FaqCollection,
  'goboat/map-block': MapBlock,
  'goboat/quote': Quote,
  'goboat/fact-box': FactBox,
  'goboat/pricing-table': PricingTable,
  'goboat/openli': OpenLi,
  'goboat/full-width-image': FullWidthImage,
  'goboat/section-tag': SectionTag,
  'goboat/image-grid': ImageGrid,
};
