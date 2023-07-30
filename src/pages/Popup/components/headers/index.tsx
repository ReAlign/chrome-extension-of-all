import React, { useState, useEffect, Fragment } from 'react';
import { Button, Drawer, Grid, Input, Radio, Switch } from '@alifd/next';

import { STORAGE } from '@/constants';

import './index.scss';

const { ALL_S_K_Headers } = STORAGE;

const makeValueFromLabel = (label: string) => label.replaceAll(' ', '_');

const InputProps = {
  //
};

type HeadersDataItem = {
  enable: boolean;
  k: string;
  v: string;
};
type HeadersDataBlockItem = {
  label: string;
  enable: boolean;
  list: HeadersDataItem[];
};

export const Headers = () => {
  const [extraCls, setExtraCls] = useState<string>('');
  const [data, setData] = useState<HeadersDataBlockItem[] | null>(null);

  const [radioIdx, setRadioIdx] = useState<number>(-1);
  const [radioValue, setRadioValue] = useState<false | string | undefined>(
    undefined
  );

  const [addHeadersGroupPopupVisible, setAddHeadersGroupPopupVisible] =
    useState(false);
  const [newGroupLabel, setNewGroupLabel] = useState('');
  const [errorTxt, setErrorTxt] = useState('');

  const showSavedAni = () => {
    setExtraCls('a-x-show');
    setTimeout(() => {
      setExtraCls('');
    }, 3000 + 500);
  };

  const updateStorage = (_data: HeadersDataBlockItem[]) => {
    showSavedAni();
    console.log('_data:: ', _data);
    chrome.storage.local.set({ [ALL_S_K_Headers]: _data });
  };

  const respChange = ({
    dataIdx,
    listIdx,
    flag,
    k,
    v,
    enter,
  }: {
    dataIdx: number;
    listIdx: number;
    flag?: boolean;
    k?: string;
    v?: string;
    enter?: boolean;
  }) => {
    if (data) {
      const is_switch = flag !== undefined;
      const is_enter = enter === true;
      const _data = [...data];

      let _dataComplete = false;

      if (is_switch) {
        _data[dataIdx].list[listIdx].enable = flag;
      } else if (k !== undefined) {
        _data[dataIdx].list[listIdx].k = k;
      } else if (v !== undefined) {
        _data[dataIdx].list[listIdx].v = v;
      } else if (is_enter) {
        // will update _dataComplete
        // console.log('_dataComplete: ', _data)
        // TODO ???
        _dataComplete = true;
      } else {
        //
      }

      setData(_data);

      if (is_switch || (is_enter && _dataComplete)) {
        updateStorage(_data);
      }
    }
  };

  const onSwitchChange = (opts: {
    dataIdx: number;
    listIdx: number;
    flag: boolean;
  }) => {
    respChange(opts);
  };

  const onInputChange = (opts: {
    dataIdx: number;
    listIdx: number;
    k?: string;
    v?: string;
  }) => {
    respChange(opts);
  };

  const onInputEnter = (
    e: React.KeyboardEvent<HTMLInputElement>,
    opts: {
      dataIdx: number;
      listIdx: number;
    }
  ) => {
    if (e.key === 'Enter') {
      respChange({
        ...opts,
        enter: true,
      });
    }
  };

  const addListItem = ({
    //
    dataIdx,
  }: {
    dataIdx: number;
  }) => {
    if (data) {
      const _data = [...data];
      _data[dataIdx].list.push({
        enable: false,
        k: '',
        v: '',
      });
      setData(_data);
    }
  };

  const removeListItem = ({
    //
    dataIdx,
    listIdx,
  }: {
    dataIdx: number;
    listIdx: number;
  }) => {
    if (data) {
      const _data = [...data];
      _data[dataIdx].list.splice(listIdx, 1);
      setData(_data);
      updateStorage(_data);
    }
  };

  const addDataItem = (newLabel: string) => {
    if (data) {
      const _data = [...data];
      _data.push({
        label: newLabel,
        enable: false,
        list: [
          {
            enable: false,
            k: '',
            v: '',
          },
        ],
      });
      setData(_data);
    }
  };

  useEffect(() => {
    // const X: HeadersDataBlockItem[] = [
    //   {
    //     label: 'QA',
    //     enable: true,
    //     list: [
    //       {
    //         enable: true,
    //         k: 'x-gray-env',
    //         v: 'content-qa',
    //       },
    //       {
    //         enable: true,
    //         k: 'k8scluster',
    //         v: 'live-web-ui-pr-172172',
    //       },
    //     ],
    //   },
    //   {
    //     label: 'gray',
    //     enable: false,
    //     list: [
    //       {
    //         enable: false,
    //         k: 'x-gray-env',
    //         v: 'gray',
    //       },
    //       {
    //         enable: false,
    //         k: 'k8scluster',
    //         v: 'true',
    //       },
    //     ],
    //   },
    // ];
    // chrome.storage.local.set({ [ALL_S_K_Headers]: X });
    chrome.storage.local.get([ALL_S_K_Headers]).then((res) => {
      const D = res?.[ALL_S_K_Headers];
      console.log('__ALL_S_K_Headers__: ', D);
      if (D !== undefined) {
        setData(D);
      }
    });
  }, []);

  useEffect(() => {
    if (data) {
      const selectedIdx =
        data.findIndex((x: HeadersDataBlockItem) => x?.enable) ?? -1;
      const defVal = (selectedIdx === -1 ? {} : data[selectedIdx]).label;
      if (defVal) {
        setRadioValue(makeValueFromLabel(defVal));
        setRadioIdx(selectedIdx);
      }
    }
  }, [data]);

  return (
    <div className="cls-headers-container">
      {data && radioValue !== false && (
        <Radio.Group
          className="cls-headers-radiogroup"
          direction="ver"
          size="large"
          value={radioValue}
          onChange={(value) => {
            const idx = data.findIndex(
              (x) => makeValueFromLabel(x?.label) === value
            );
            const _data = [...data];
            if (radioIdx !== -1) {
              _data[radioIdx].enable = false;
            }
            _data[idx].enable = true;

            setRadioValue(`${value}`);
            setRadioIdx(idx);

            setData(_data);
            updateStorage(_data);
          }}
        >
          {data.map((dataItem: HeadersDataBlockItem, dataIdx) => {
            const value = makeValueFromLabel(dataItem.label);
            return (
              <Fragment key={value}>
                <Grid.Row
                  style={{
                    margin: '8px 0',
                    paddingBottom: dataItem.enable ? '16px' : '8px',
                    borderBottom: '1px solid #eee',
                  }}
                >
                  <Grid.Col span="6">
                    <Radio
                      value={value}
                      onClick={() => {
                        //
                      }}
                    >
                      {dataItem.label}
                    </Radio>
                  </Grid.Col>
                  <Grid.Col
                    span="18"
                    style={{
                      flexDirection: 'column',
                      ...(dataItem.enable === false
                        ? {
                            opacity: '.3',
                            pointerEvents: 'none',
                          }
                        : {}),
                    }}
                  >
                    {dataItem.list?.map(
                      (listItem: HeadersDataItem, listIdx) => {
                        return (
                          <Grid.Row
                            key={`row_${listIdx}`}
                            gutter={10}
                            style={{ marginBottom: '2px' }}
                          >
                            <Grid.Col span="3">
                              <Switch
                                size="small"
                                defaultChecked={listItem.enable}
                                onChange={(flag) => {
                                  onSwitchChange({
                                    dataIdx,
                                    listIdx,
                                    flag,
                                  });
                                }}
                              />
                            </Grid.Col>
                            <Grid.Col span="8">
                              <Input
                                {...InputProps}
                                placeholder="Name"
                                value={listItem.k}
                                onChange={(k) => {
                                  onInputChange({
                                    dataIdx,
                                    listIdx,
                                    k,
                                  });
                                }}
                                onKeyDown={(e) => {
                                  onInputEnter(e, {
                                    dataIdx,
                                    listIdx,
                                  });
                                }}
                              />
                            </Grid.Col>
                            <Grid.Col span="11">
                              <Input
                                {...InputProps}
                                placeholder="Value"
                                value={listItem.v}
                                onChange={(v) => {
                                  onInputChange({
                                    dataIdx,
                                    listIdx,
                                    v,
                                  });
                                }}
                                onKeyDown={(e) => {
                                  onInputEnter(e, {
                                    dataIdx,
                                    listIdx,
                                  });
                                }}
                              />
                            </Grid.Col>
                            <Grid.Col span="2">
                              <Button
                                size="small"
                                warning
                                onClick={() => {
                                  removeListItem({
                                    dataIdx,
                                    listIdx,
                                  });
                                }}
                              >
                                x
                              </Button>
                            </Grid.Col>
                          </Grid.Row>
                        );
                      }
                    )}
                  </Grid.Col>
                </Grid.Row>
                {dataItem.enable && (
                  <div
                    style={{
                      position: 'relative',
                      textAlign: 'center',
                      marginTop: '-20px',
                    }}
                  >
                    <Button
                      size="small"
                      type="secondary"
                      onClick={() => {
                        addListItem({
                          dataIdx,
                        });
                      }}
                    >
                      Add Header Item
                    </Button>
                    <Button
                      size="small"
                      warning
                      style={{ marginLeft: '4px' }}
                      onClick={() => {
                        // TODO 选中 radio 怎么处理
                      }}
                    >
                      Remove Group
                    </Button>
                  </div>
                )}
              </Fragment>
            );
          })}
        </Radio.Group>
      )}
      <div
        style={{
          textAlign: 'center',
          marginTop: '12px',
        }}
      >
        <Button
          type="primary"
          onClick={() => {
            setAddHeadersGroupPopupVisible(true);
          }}
        >
          Add Headers Group
        </Button>
        <Drawer
          title=""
          className="cls-headers-new-group-drawer"
          visible={addHeadersGroupPopupVisible}
          placement="bottom"
          onClose={() => {
            setAddHeadersGroupPopupVisible(false);
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <Input
              autoFocus
              trim
              placeholder="Label, Enter to confirm"
              state={errorTxt ? 'error' : undefined}
              value={newGroupLabel}
              onChange={(v) => {
                setErrorTxt('');
                setNewGroupLabel(v);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const _v = newGroupLabel.toLocaleLowerCase();
                  const _labels =
                    data?.map((x) => x.label.toLocaleLowerCase()) || [];
                  if (_v && _labels.includes(_v) === false) {
                    addDataItem(newGroupLabel);
                    setNewGroupLabel('');
                    setAddHeadersGroupPopupVisible(false);
                  } else {
                    setErrorTxt('repeat');
                  }
                }
              }}
            />
            <br />
            <div style={{ color: '#FF3000', height: '20px' }}>{errorTxt}</div>
          </div>
        </Drawer>
      </div>
      <div className={`cls-headers-saved ${extraCls}`}>Saved</div>
    </div>
  );
};
