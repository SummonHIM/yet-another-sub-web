export const config: Config = {
    clients: {
        自动识别: "auto",
        Clash: "clash",
        ClashR: "clashr",
        Quantumult: "quan",
        QuantumultX: "quanx",
        Loon: "loon",
        Mellow: "mellow",
        Shadowsocks: "ss",
        ShadowsocksSub: "sssub",
        ShadowsocksD: "ssd",
        ShadowsocksR: "ssr",
        Surfboard: "surfboard",
        Surge2: "surge&ver=2",
        Surge3: "surge&ver=3",
        Surge4: "surge&ver=4",
        Trojan: "trojan",
        V2Ray: "v2ray",
        Singbox: "singbox",
        混合订阅: "mixed",
    },
    switchCells: [
        { title: "TCP 快速打开", key: "tfo" },
        { title: "UDP 启用", key: "udp" },
        { title: "关闭证书检查", key: "scv" },
        { title: "显示节点类型", key: "append_type" },
        { title: "显示 Emoji 旗帜", key: "emoji" },
        { title: "仅输出为节点", key: "list" },
    ],
    remoteConfig: [
        {
            category: "ACL4SSR 规则",
            items: [
                {
                    label: "基础规则",
                    value:
                        "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR.ini",
                },
                {
                    label: "基础规则 广告拦截增强",
                    value:
                        "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_AdblockPlus.ini",
                },
                {
                    label: "基础规则 回国专用",
                    value:
                        "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_BackCN.ini",
                },
                {
                    label: "基础规则 去除自动",
                    value:
                        "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_NoAuto.ini",
                },
                {
                    label: "基础规则 去除微软",
                    value:
                        "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_NoMicrosoft.ini",
                },
                {
                    label: "基础规则 去除苹果",
                    value:
                        "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_NoApple.ini",
                },
                {
                    label: "基础规则 去除自动 去除苹果",
                    value:
                        "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_NoAuto_NoApple.ini",
                },
                {
                    label: "基础规则 去除自动 去除苹果 去除微软",
                    value:
                        "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_NoAuto_NoApple_NoMicrosoft.ini",
                },
                {
                    label: "基础规则 大陆 IP",
                    value:
                        "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_WithChinaIp.ini",
                },
                {
                    label: "基础规则 GFW IP",
                    value:
                        "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_WithGFW.ini",
                },
                {
                    label: "基础规则 大陆 IP GFW IP",
                    value:
                        "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_WithChinaIp_WithGFW.ini",
                },
                {
                    label: "精简规则",
                    value:
                        "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Mini.ini",
                },
                {
                    label: "精简规则 故障转移",
                    value:
                        "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Mini_Fallback.ini",
                },
                {
                    label: "精简规则 负载均衡",
                    value:
                        "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Mini_MultiMode.ini",
                },
                {
                    label: "精简规则 去除自动",
                    value:
                        "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Mini_NoAuto.ini",
                },
                {
                    label: "在线规则",
                    value:
                        "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online.ini",
                },
                {
                    label: "在线规则 广告拦截增强",
                    value:
                        "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_AdblockPlus.ini",
                },
                {
                    label: "在线规则 国家分类",
                    value:
                        "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_MultiCountry.ini",
                },
                {
                    label: "在线规则 去除自动",
                    value:
                        "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_NoAuto.ini",
                },
                {
                    label: "在线规则 去除拦截",
                    value:
                        "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_NoReject.ini",
                },
                {
                    label: "增强在线规则",
                    value:
                        "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Full.ini",
                },
                {
                    label: "增强在线规则 广告拦截增强",
                    value:
                        "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Full_AdblockPlus.ini",
                },
                {
                    label: "增强在线规则 谷歌分类",
                    value:
                        "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Full_Google.ini",
                },
                {
                    label: "增强在线规则 负载均衡",
                    value:
                        "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Full_MultiMode.ini",
                },
                {
                    label: "增强在线规则 奈飞分类",
                    value:
                        "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Full_Netflix.ini",
                },
                {
                    label: "增强在线规则 去除自动",
                    value:
                        "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Full_NoAuto.ini",
                },
                {
                    label: "精简在线规则",
                    value:
                        "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Mini.ini",
                },
                {
                    label: "精简在线规则 广告拦截增强",
                    value:
                        "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Mini_AdblockPlus.ini",
                },
                {
                    label: "精简在线规则 AI 分类",
                    value:
                        "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Mini_Ai.ini",
                },
                {
                    label: "精简在线规则 故障转移",
                    value:
                        "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Mini_Fallback.ini",
                },
                {
                    label: "精简在线规则 国家分类",
                    value:
                        "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Mini_MultiCountry.ini",
                },
                {
                    label: "精简在线规则 负载均衡",
                    value:
                        "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Mini_MultiMode.ini",
                },
                {
                    label: "精简在线规则 去除自动",
                    value:
                        "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Mini_NoAuto.ini",
                },
            ],
        },
    ],
};
