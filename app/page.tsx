'use client'

import { useCallback, useState } from "react";
import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteSection,
  Button,
  Card,
  CardBody,
  CardFooter,
  Link,
  Tab,
  Tabs,
  Textarea,
} from "@nextui-org/react";
import { Icon } from '@iconify/react/dist/iconify.js';

import { toast } from "sonner";
import copy from 'copy-to-clipboard';

import { config as cfg } from '@/config'

import { TextCell } from "@/components/TextCell";
import { InputCell } from "@/components/InputCell";
import { SwitchCell } from "@/components/SwitchCell";
import { SwitchTheme } from "@/components/SwitchTheme";

import { createSub } from "@/app/hooks/createSub";
import { createShortSub } from "@/app/hooks/createShortSub";
import { webSafeBase64Encode } from "./hooks/base64";

const backends = process.env.NEXT_PUBLIC_BACKENDS?.split('|') ?? ["http://127.0.0.1:25500/sub?"]
const initialParams: Params = {
  mode: 'easy',
  subLink: '',
  shortSubLink: '',
  shortSubLoading: false,
  backend: backends[0],
  url: '',
  target: '',
  config: '',
  include: '',
  exclude: '',
  tfo: false,
  udp: false,
  scv: false,
  append_type: false,
  emoji: false,
  list: false,
  importBtn: false,
  importBtnText: "未知客户端"
};

export default function Home() {
  const tabs = [
    {
      key: 'easy',
      label: '简单模式',
      icon: 'solar:cat-linear',
    },
    {
      key: 'hard',
      label: '进阶模式',
      icon: 'solar:winrar-linear',
    },
  ];

  const [params, setParams] = useState(initialParams)

  const checkImportScheme = () => {
    const target = cfg.clients[params.target as keyof typeof cfg.clients]
    const allowedTargets = new Set([
      'clash', 'clashr', 'quan', 'quanx', 'loon', 'surfboard',
      'surge&ver=2', 'surge&ver=3', 'surge&ver=4', 'singbox'
    ])
    return allowedTargets.has(target)
  }

  const createSubscription = useCallback(() => {
    try {
      const subLink = createSub(params)
      const importBtn = checkImportScheme()
      const importBtnText = params.target

      copy(subLink)
      toast.success('定制订阅已复制到剪贴板')

      setParams(prevParams => ({ ...prevParams, subLink, importBtn, importBtnText }))
    } catch (e) {
      toast.error((e as Error).message)
    }
  }, [params])

  const createShortSubscription = useCallback(async () => {
    setParams(prevParams => ({ ...prevParams, shortSubLoading: true }));
    try {
      const shortSubLink = await createShortSub(params.subLink);
      copy(shortSubLink);
      toast.success('短链接已复制到剪贴板');

      setParams(prevParams => ({ ...prevParams, shortSubLink }));
    } catch (e) {
      toast.error((e as Error).message)
    } finally {
      setParams(prevParams => ({ ...prevParams, shortSubLoading: false }));
    }
  }, [params.subLink]);

  const importClash = useCallback(() => {
    const { subLink, shortSubLink } = params;

    if (!subLink) return toast.error('请在生成订阅链接后再试');

    const url = shortSubLink || subLink;
    window.location.href = `clash://install-config?url=${encodeURIComponent(url)}`;
  }, [params.subLink || params.shortSubLink]);

  const createImportScheme = useCallback(() => {
    const { subLink, shortSubLink, target } = params;
    if (!subLink) return toast.error('请在生成订阅链接后再试');

    const url = shortSubLink || subLink;
    let importScheme: string

    switch (cfg.clients[target as keyof typeof cfg.clients]) {
      case "clash":
      case "clashr":
        // https://www.clashverge.dev/guide/url_schemes.html
        // https://github.com/MetaCubeX/ClashMetaForAndroid?tab=readme-ov-file#automation
        importScheme = `clash://install-config?url=${encodeURIComponent(url)}`;
        break;
      case "quan":
        // https://github.com/crossutility/Quantumult/blob/master/quantumult-uri-scheme.md
        importScheme = `quantumult://configuration?server=${webSafeBase64Encode(url)}`;
        break;
      case "quanx":
        // https://github.com/crossutility/Quantumult-X/blob/master/url-scheme.md
        const remote_resource = { "server_remote": [ url ] };
        importScheme = `quantumult-x:///update-configuration?remote-resource=${encodeURIComponent(JSON.stringify(remote_resource))}`;
        break;
      case "loon":
        // https://nsloon.app/docs/Scheme/#%E5%AE%89%E8%A3%85%E8%BF%9C%E7%AB%AF%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6
        importScheme = `loon://import?sub=${encodeURIComponent(url)}`;
        break;
      case "surfboard":
        // https://getsurfboard.com/docs/deeplink
        importScheme = `surfboard:///install-config?url=${encodeURIComponent(url)}`;
        break;
      case "surge&ver=2":
      case "surge&ver=3":
      case "surge&ver=4":
        // https://manual.nssurge.com/others/url-scheme.html
        importScheme = `surge:///install-config?url=${encodeURIComponent(url)}`;
        break;
      case "singbox":
        // https://sing-box.sagernet.org/clients/general/#profile
        importScheme = `sing-box://import-remote-profile?url=${encodeURIComponent(url)}`;
        break;
      default:
        return toast.error('不受支持的客户端');
    }

    window.location.href = importScheme;
  }, [params.subLink || params.shortSubLink || params.target])

  return (
    <div className="w-full p-4 flex flex-col justify-center items-center gap-3">
      <Card className="w-full lg:w-1/2 md:w-2/3">
        <CardBody>
          <Tabs
            size="lg"
            fullWidth
            aria-label="Mode"
            items={tabs}
            selectedKey={params.mode}
            onSelectionChange={(key) => setParams({ ...params, mode: key.toString() as Params["mode"] })}
          >
            {(item) => (
              <Tab key={item.key} title={
                <div className="flex items-center space-x-2 font-bold">
                  <Icon icon={item.icon}></Icon>
                  <span>{item.label}</span>
                </div>
              }>
                <div className="flex flex-col gap-3">
                  <Textarea
                    variant="bordered"
                    label="订阅链接"
                    placeholder="支持订阅或ss/ssr/vmess链接，多个链接每行一个或者用 | 分隔"
                    className="w-full"
                    minRows={1}
                    value={params.url}
                    onValueChange={(value) => setParams({ ...params, url: value })}
                  />
                  <Autocomplete
                    variant="bordered"
                    label="软件类型"
                    placeholder="请选择你使用的客户端类型"
                    className="w-full"
                    selectedKey={params.target}
                    onSelectionChange={(key) => setParams({ ...params, target: (key ?? '').toString() })}
                    defaultItems={Object.entries(cfg.clients)}
                  >
                    {(item => (
                      <AutocompleteItem key={item[0]}>
                        {item[0]}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>
                  <Autocomplete
                    variant="bordered"
                    label="后端地址"
                    placeholder="请选择或输入使用的后端地址，留空则为使用默认后端"
                    className="w-full"
                    allowsCustomValue
                    inputValue={params.backend}
                    onInputChange={(value) => setParams({ ...params, backend: value })}
                    defaultItems={backends.map(value => ({
                      value: value
                    }))}
                  >
                    {(item => (
                      <AutocompleteItem key={item.value}>
                        {item.value}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>
                  {/* 进阶模式 */}
                  {params.mode === 'hard' ? (<div className="flex flex-col gap-3">
                    <Autocomplete
                      variant="bordered"
                      label="远程配置"
                      placeholder="请选择或输入需要的远程配置，留空则为不需要远程配置"
                      className="w-full"
                      allowsCustomValue
                      inputValue={params.config}
                      onInputChange={(value) => setParams({ ...params, config: value })}
                      defaultItems={cfg.remoteConfig}
                    >
                      {(item => (
                        <AutocompleteSection
                          key={item.category}
                          title={item.category}
                          classNames={{
                            heading: "flex w-full sticky top-1 z-20 py-1.5 px-2 bg-default-100 shadow-small rounded-small"
                          }}
                        >
                          {item.items.map(url => (
                            <AutocompleteItem key={url.label}>
                              {url.label}
                            </AutocompleteItem>
                          ))}
                        </AutocompleteSection>
                      ))}
                    </Autocomplete>
                    <div className="flex flex-row gap-3">
                      <InputCell
                        label="包含节点"
                        value={params.include}
                        onValueChange={(value) => setParams({ ...params, include: value })}
                        placeholder="节点名包含的关键字，支持正则"
                      />
                      <InputCell
                        label="排除节点"
                        value={params.exclude}
                        onValueChange={(value) => setParams({ ...params, exclude: value })}
                        placeholder="节点名排除的关键字，支持正则"
                      />
                    </div>
                    <div className='flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 gap-3'>
                      {cfg.switchCells.map((cell) => (
                        <SwitchCell
                          key={cell.key}
                          title={cell.title}
                          isSelected={params[cell.key as keyof Params] as boolean}
                          onValueChange={(value) => setParams({ ...params, [cell.key]: value })}
                        />
                      ))}
                    </div>
                  </div>) : null}
                </div>
              </Tab>
            )}
          </Tabs>
        </CardBody>
        <CardFooter className="flex flex-col gap-5 pt-4">
          <div
            className="w-2/3 flex flex-col gap-3"
          >
            <Button
              color="primary"
              startContent={<Icon icon="solar:link-round-angle-linear" />}
              onPress={createSubscription}
            >生成订阅链接</Button>
            <Button
              isLoading={params.shortSubLoading}
              color="primary"
              startContent={<Icon icon="solar:link-minimalistic-2-linear" />}
              onPress={createShortSubscription}
            >生成短链接</Button>
          </div>
          <TextCell
            label="定制订阅"
            value={params.subLink}
            placeholder="请先输入订阅链接和选择客户端后，点击生成订阅链接"
          />
          <TextCell
            label="订阅短链"
            value={params.shortSubLink}
            placeholder="生成订阅链接后，点击生成短链"
          />
          {params.importBtn && (params.shortSubLink || params.subLink) ? (
            <div
              className="w-2/3 flex flex-col gap-3"
            >
              <Button
                color="default"
                startContent={<Icon icon="solar:cloud-download-linear" />}
                onPress={createImportScheme}
              >导入至 {params.importBtnText}</Button>
            </div>
          ) : null}
          {process.env.NODE_ENV === 'development' ? (
            <Textarea
              isReadOnly
              variant="bordered"
              label="测试环境"
              className="w-full"
              value={JSON.stringify(params)}
            />
          ) : null}
        </CardFooter>
      </Card>
      <p className="text-bold text-sm text-center">
        Made with <SwitchTheme /> by <Link isExternal href="https://github.com/DyAxy/yet-another-sub-web">DyAxy</Link>.
      </p>
    </div >
  );
}
