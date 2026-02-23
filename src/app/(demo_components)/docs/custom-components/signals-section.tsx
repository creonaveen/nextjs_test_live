'use client';

/**
 * Demo component for the SignalsSection component.
 * Shows how to use the signals section with signal cards.
 *
 * @returns A demo of the SignalsSection component
 */
export const signalsSectionCode = `
      signal_stat_criteria: {
        market_id: '1',
        market_term_code: 'US',
        description: 'US Market signals',
      },
      has_signals: true,
      signals: {
        trbr_u: {
          post_name: 'h_TR',
          indicator_pseudo: 'TR',
          importance: '40',
          title: 'Rising trend',
          ingress:
            'Rising trends indicate that the company experiences positive development and increasing buy interest among investors.',
          help_teaser_image: {
            type: 'image',
            src: 'https://www.investtech.com/images/help/h_TR_0.png',
            src_light: 'https://www.investtech.com/images/help/h_TR_0.png',
            src_dark: 'https://www.investtech.com/images/help/h_TR_1.png',
            src_light_big: 'https://www.investtech.com/images/help/indicator/h_TR.720x400_0.png',
            src_dark_big: 'https://www.investtech.com/images/help/indicator/h_TR.720x400_1.png',
          },
          help_url: '?MarketID=461&p=staticPage&mode=singleItem&fn=h_TR&parentFn=helpResearchTrend',
          recommendation: 'buy',
          arrow_direction: '19',
          arrow_image: {
            type: 'image',
            src: 'https://www.investtech.com/images/arrows/arrowSet19.svg',
            src_light: 'https://www.investtech.com/images/arrows/arrowSet19.svg',
            src_dark: 'https://www.investtech.com/images/arrows/arrowSet19.svg',
            src_light_big: 'https://www.investtech.com/images/arrows/arrowSet19.svg',
            src_dark_big: 'https://www.investtech.com/images/arrows/arrowSet19.svg',
            width: '24',
            height: '24',
          },
          has_statistics: true,
          priority: 'pri1',
          statistics: {
            info: 'Buy:221010-Trend rising. Ann_excess_ret: 6.52 (35097)',
            annual_excess_return: '+6.5',
            num_signals: '35097',
            num_signals_text: '35097 signals Nordic stocks.',
            color: 'buy',
          },
        },
        srres_close: {
          post_name: 'h_SupClose',
          indicator_pseudo: 'SRSupClose',
          importance: '30',
          title: 'Price near support',
          ingress:
            'Price is near support. The stock has reversed here before. Many investors find it to be cheap and may wish to buy again.',
          help_teaser_image: {
            type: 'image',
            src: 'https://www.investtech.com/images/help/h_SupClose_0.png',
            src_light: 'https://www.investtech.com/images/help/h_SupClose_0.png',
            src_dark: 'https://www.investtech.com/images/help/h_SupClose_1.png',
            src_light_big:
              'https://www.investtech.com/images/help/indicator/h_SupClose.720x400_0.png',
            src_dark_big:
              'https://www.investtech.com/images/help/indicator/h_SupClose.720x400_1.png',
          },
          help_url:
            '?MarketID=461&p=staticPage&mode=singleItem&fn=h_SupClose&parentFn=helpResearchSupportAndResistance',
          recommendation: 'watch',
          arrow_direction: '10',
          arrow_image: {
            type: 'image',
            src: 'https://www.investtech.com/images/arrows/arrowSet10.svg',
            src_light: 'https://www.investtech.com/images/arrows/arrowSet10.svg',
            src_dark: 'https://www.investtech.com/images/arrows/arrowSet10.svg',
            src_light_big: 'https://www.investtech.com/images/arrows/arrowSet10.svg',
            src_dark_big: 'https://www.investtech.com/images/arrows/arrowSet10.svg',
            width: '24',
            height: '24',
          },
          has_statistics: true,
          priority: 'pri1',
          statistics: {
            info: 'Buy:304000-Price near support (aggr). Ann_excess_ret:-0.73 (39112)',
            annual_excess_return: '-0.7',
            num_signals: '39112',
            num_signals_text: '39112 signals Nordic stocks.',
            color: 'watch',
          },
        },
        pvcpos_thor: {
          post_name: 'h_PatRecBuy',
          indicator_pseudo: 'PatternBuyRec',
          importance: '20',
          title: 'Buy signal from rectangle formation',
          ingress:
            'A buy signal from a rectangle formation signals increasing optimism among investors and signals that the stock continues or enters a rising trend.',
          help_teaser_image: {
            type: 'image',
            src: 'https://www.investtech.com/images/help/h_PatRecBuy_0.png',
            src_light: 'https://www.investtech.com/images/help/h_PatRecBuy_0.png',
            src_dark: 'https://www.investtech.com/images/help/h_PatRecBuy_1.png',
            src_light_big:
              'https://www.investtech.com/images/help/indicator/h_PatRecBuy.720x400_0.png',
            src_dark_big:
              'https://www.investtech.com/images/help/indicator/h_PatRecBuy.720x400_1.png',
          },
          help_url:
            '?MarketID=461&p=staticPage&mode=singleItem&fn=h_PatRecBuy&parentFn=helpResearchFormations',
          recommendation: 'buy',
          arrow_direction: '19',
          arrow_image: {
            type: 'image',
            src: 'https://www.investtech.com/images/arrows/arrowSet19.svg',
            src_light: 'https://www.investtech.com/images/arrows/arrowSet19.svg',
            src_dark: 'https://www.investtech.com/images/arrows/arrowSet19.svg',
            src_light_big: 'https://www.investtech.com/images/arrows/arrowSet19.svg',
            src_dark_big: 'https://www.investtech.com/images/arrows/arrowSet19.svg',
            width: '24',
            height: '24',
          },
          has_statistics: true,
          priority: 'pri1',
          statistics: {
            info: 'Buy:201000-Rectangle broken up. Ann_excess_ret: 8.94 (3368)',
            annual_excess_return: '+8.9',
            num_signals: '3368',
            num_signals_text: '3368 signals Nordic stocks.',
            color: 'buy',
          },
        },
        rsi_low: {
          post_name: 'h_RsiHigh',
          indicator_pseudo: 'RsiHigh',
          importance: '15',
          title: 'High positive momentum and overbought',
          ingress:
            'The stock has high positive momentum and RSI is overbought, see the red colour in the price chart. The stock price has risen a lot, without significant corrections downwards. This is common in rising trends, but may indicate that the price soon will fall in horizontal or falling trends.',
          help_teaser_image: {
            type: 'image',
            src: 'https://www.investtech.com/images/help/h_RsiHigh_0.png',
            src_light: 'https://www.investtech.com/images/help/h_RsiHigh_0.png',
            src_dark: 'https://www.investtech.com/images/help/h_RsiHigh_1.png',
            src_light_big:
              'https://www.investtech.com/images/help/indicator/h_RsiHigh.720x400_0.png',
            src_dark_big:
              'https://www.investtech.com/images/help/indicator/h_RsiHigh.720x400_1.png',
          },
          help_url:
            '?MarketID=461&p=staticPage&mode=singleItem&fn=h_RsiHigh&parentFn=helpResearchMomentumAndRsi',
          recommendation: 'buy',
          arrow_direction: '19',
          arrow_image: {
            type: 'image',
            src: 'https://www.investtech.com/images/arrows/arrowSet19.svg',
            src_light: 'https://www.investtech.com/images/arrows/arrowSet19.svg',
            src_dark: 'https://www.investtech.com/images/arrows/arrowSet19.svg',
            src_light_big: 'https://www.investtech.com/images/arrows/arrowSet19.svg',
            src_dark_big: 'https://www.investtech.com/images/arrows/arrowSet19.svg',
            width: '24',
            height: '24',
          },
          has_statistics: true,
          priority: 'pri1',
          statistics: {
            info: 'Buy:623721-RSI ligger over 70. Ann_excess_ret: 7.41 (35864)',
            annual_excess_return: '+7.4',
            num_signals: '35864',
            num_signals_text: '35864 signals Nordic stocks.',
            color: 'buy',
          },
        },
        ihs_watch: {
          post_name: 'h_PatIhsWatch',
          indicator_pseudo: 'IhsWatch',
          importance: '10',
          title: 'Developing inverse head and shoulders formation',
          ingress:
            'A potential inverse head and shoulders formation is developing. It may trigger a strong buy signal.',
          help_teaser_image: {
            type: 'image',
            src: 'https://www.investtech.com/images/help/h_PatIhsWatch_0.png',
            src_light: 'https://www.investtech.com/images/help/h_PatIhsWatch_0.png',
            src_dark: 'https://www.investtech.com/images/help/h_PatIhsWatch_1.png',
            src_light_big:
              'https://www.investtech.com/images/help/indicator/h_PatIhsWatch.720x400_0.png',
            src_dark_big:
              'https://www.investtech.com/images/help/indicator/h_PatIhsWatch.720x400_1.png',
          },
          help_url:
            '?MarketID=461&p=staticPage&mode=singleItem&fn=h_PatIhsWatch&parentFn=helpResearchFormations',
          recommendation: 'watch',
          arrow_direction: '10',
          arrow_image: {
            type: 'image',
            src: 'https://www.investtech.com/images/arrows/arrowSet10.svg',
            src_light: 'https://www.investtech.com/images/arrows/arrowSet10.svg',
            src_dark: 'https://www.investtech.com/images/arrows/arrowSet10.svg',
            src_light_big: 'https://www.investtech.com/images/arrows/arrowSet10.svg',
            src_dark_big: 'https://www.investtech.com/images/arrows/arrowSet10.svg',
            width: '24',
            height: '24',
          },
          has_statistics: false,
          priority: 'pri2',
          statistics: {
            info: '',
            annual_excess_return: '',
            num_signals: '',
            num_signals_text: '',
            color: 'neutral',
          },
        },
      } as unknown as Signals,
    },
    labels_and_texts: {
      module_title: 'Current Signals',
      sub_title: 'Technical Analysis',
      see_more: 'See more',
      help_source: 'signals-help',
      pp: '%',
      market_term: 'US Market',
      help_data: {
        post_name: 'signals-help',
        found: true,
        data: {
          title: 'About Technical Signals',
          teaser_text_short: 'Learn more about technical signals and how they work.',
          teaser_text:
            'Technical signals are indicators based on price action, volume, and other technical analysis factors. They help identify potential buy or sell opportunities in the market.',
          content: 'Full help content...',
        },
        meta: {
          post_id: '123',
          language: 'en',
        },
      },
    },
  };

  // return <SignalsSection data={sampleData} />;
}
`;

export const signalsSectionCodeTsx = `
'use client';

import { SignalsSection } from '@/app/company/[id]/components/signals-section';
import {
  KeyInfoLabelsAndTexts,
  CompanySectionCurrentSignals,
  Signals,
} from '@/lib/types/company';

export function SignalsSectionDemo() {

  const sampleKeyInfoLabelsAndTexts: KeyInfoLabelsAndTexts = {
    see_more: 'See more',
    factor_diagram_card_title: 'Factor diagram',
    factor_diagram_card_help: 'Help text',
    see_more_info: 'See more info',
    factor_diagram_element: 'Element',
    factor_diagram_value: 'Value',
    factor_diagram_score: 'Score',
  };

  const sampleData: CompanySectionCurrentSignals = {
    data: {
      signal_stat_criteria: {
        market_id: '1',
        market_term_code: 'US',
        description: 'US Market signals',
      },
      has_signals: true,
      signals: {
        trbr_u: {
          post_name: 'trbr-u-signal',
          title: 'Trend Break Up',
          help_teaser_image: {
            src_light: '/screenshot/gain.png',
            src_dark: '/screenshot/gain.png',
            src_light_big: '/screenshot/gain.png',
            src_dark_big: '/screenshot/gain.png',
          },
          arrow_image: {
            src: '/screenshot/gain.png',
          },
          has_statistics: true,
          statistics: {
            color: 'buy',
            annual_excess_return: '+12.5',
            num_signals_text: '25 signals in the last year',
          },
          // ... other signal properties
        },
        // ... other signals (srres_close, thor, rsi_low, pvcpos_thor)
      },
    },
    labels_and_texts: {
      module_title: 'Current Signals',
      sub_title: 'Technical Analysis',
      pp: '%',
      help_data: {
        data: {
          title: 'About Technical Signals',
          teaser_text_short: 'Learn more about technical signals...',
          teaser_text: 'Full help text...',
        },
      },
    },
  };

  return (
    <SignalsSection
      data={sampleData}
      keyInfoLabelsAndTexts={sampleKeyInfoLabelsAndTexts}
    />
  );
}
`;

export const signalsSectionJson = {
  data: {
    data: {
      signal_stat_criteria: {
        market_id: '1',
        market_term_code: 'US',
        description: 'US Market signals',
      },
      has_signals: true,
      signals: {
        trbr_u: {
          post_name: 'trbr-u-signal',
          indicator_pseudo: 'TRBR_U',
          importance: 'high',
          title: 'Trend Break Up',
          ingress: 'Signal indicating upward trend break',
          help_teaser_image: {
            type: 'image',
            src_light: '/screenshot/gain.png',
            src_dark: '/screenshot/gain.png',
            src_light_big: '/screenshot/gain.png',
            src_dark_big: '/screenshot/gain.png',
          },
          help_url: '/docs/trbr-u-signal',
          has_statistics: true,
          priority: 'high',
          statistics: {
            info: 'Statistics info',
            annual_excess_return: '+12.5',
            num_signals: '25',
            num_signals_text: '25 signals in the last year',
            color: 'buy',
          },
          recommendation: 'Buy',
          arrow_direction: 'up',
          arrow_image: {
            type: 'image',
            src: '/screenshot/gain.png',
          },
        },
        srres_close: {
          post_name: 'srres-close-signal',
          title: 'Support/Resistance Close',
          has_statistics: true,
          statistics: {
            color: 'buy',
            annual_excess_return: '+8.3',
            num_signals_text: '18 signals in the last year',
          },
        },
        thor: {
          post_name: 'thor-signal',
          title: 'THOR Signal',
          has_statistics: false,
        },
        rsi_low: {
          post_name: 'rsi-low-signal',
          title: 'RSI Low',
          has_statistics: true,
          statistics: {
            color: 'sell',
            annual_excess_return: '-2.1',
            num_signals_text: '12 signals in the last year',
          },
        },
        pvcpos_thor: {
          post_name: 'pvcpos-thor-signal',
          title: 'Volume Position THOR',
          has_statistics: true,
          statistics: {
            color: 'buy',
            annual_excess_return: '+15.8',
            num_signals_text: '30 signals in the last year',
          },
        },
      },
    },
    labels_and_texts: {
      module_title: 'Current Signals',
      sub_title: 'Technical Analysis',
      help_source: 'signals-help',
      pp: '%',
      market_term: 'US Market',
      help_data: {
        post_name: 'signals-help',
        found: true,
        data: {
          title: 'About Technical Signals',
          teaser_text_short: 'Learn more about technical signals and how they work.',
          teaser_text:
            'Technical signals are indicators based on price action, volume, and other technical analysis factors.',
          content: 'Full help content...',
        },
        meta: {
          post_id: '123',
          language: 'en',
        },
      },
    },
  },
  keyInfoLabelsAndTexts: {
    see_more: 'See more',
    factor_diagram_card_title: 'Factor diagram',
    factor_diagram_card_help: 'Help text',
    see_more_info: 'See more info',
    factor_diagram_element: 'Element',
    factor_diagram_value: 'Value',
    factor_diagram_score: 'Score',
  },
};
