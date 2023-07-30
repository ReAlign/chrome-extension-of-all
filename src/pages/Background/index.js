// console.log('This is the background page.');

// // Example for listening to tab switching/loading
// chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
//   if (changeInfo.status == 'complete') {
//     console.log('Tab finished loading', tabId, tab);
//     // do your things
//   }
// });

// console.log('Put the background scripts here...');
import { NET, STORAGE } from '@/constants';
import { getTabId } from '@/utils/chrome.x';

chrome.contextMenus.create({
  id: 'get-ssr-ajax',
  title: 'GetSSRAjax',
  contexts: ['all'],
  documentUrlPatterns: [
    'https://www.qa1fdg.net/en/feed/post/*',
    'https://www.binance.com/en/feed/post/*',
  ],
});
chrome.contextMenus.onClicked.addListener((info, tab) => {
  const { menuItemId } = info;

  if (menuItemId === 'get-ssr-ajax') {
    chrome.scripting
      .executeScript({
        target: { tabId: getTabId(tab) },
        func: () => {
          window.history.pushState({}, '', '/empty');
          window.location.reload();
          window.history.back();
        },
      })
      .then(() => {
        //
      });
  }
});

chrome.storage.onChanged.addListener((res) => {
  const D = res?.[STORAGE.ALL_S_K_Headers];
  if (typeof D === 'undefined') return;
  const { newValue } = D;

  const newRules = (
    (newValue.find(({ enable }) => enable === true) || {}).list || []
  )
    .filter(({ enable }) => enable === true)
    .reduce((prev, { k, v }, index) => {
      const header = k || 'ceoa-key';
      const value = v || 'ceoa_v';
      prev.push({
        id: index + 2,
        priority: 1,
        action: {
          type: 'modifyHeaders',
          requestHeaders: [
            {
              header,
              operation: 'set',
              value,
            },
          ],
        },
        condition: {
          urlFilter: '*',
          resourceTypes: NET.declarativeNetRequest_resourceTypes,
        },
      });
      return prev;
    }, []);

  chrome.declarativeNetRequest.getDynamicRules((rules) => {
    console.log(rules);
    const ids = rules.map((x) => x.id);
    chrome.declarativeNetRequest.updateDynamicRules(
      {
        removeRuleIds: ids,
      },
      (result) => {
        console.log('removeRuleIds: ', result);
        chrome.declarativeNetRequest.updateDynamicRules(
          {
            addRules: newRules,
          },
          (result) => {
            console.log('addRules: ', result);
          }
        );
      }
    );
  });
});
