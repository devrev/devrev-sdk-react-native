import { useFont } from '@shopify/react-native-skia';
import React, { useRef, useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  FlatList,
} from 'react-native';
import { CartesianChart, Line, useChartTransformState } from 'victory-native';
import TouchableOpacityButton from '../components/TouchableOpacityButton';

const MAX_POINTS = 200;

type ChartPoint = {
  time: number;
  price: number;
};

type PriceState = {
  price: number;
  open: number;
};

const SYMBOLS = [
  { symbol: 'btcusdt', name: 'Bitcoin' },
  { symbol: 'ethusdt', name: 'Ethereum' },
  { symbol: 'bnbusdt', name: 'BNB' },
  { symbol: 'xrpusdt', name: 'XRP' },
  { symbol: 'adausdt', name: 'Cardano' },
  { symbol: 'solusdt', name: 'Solana' },
  { symbol: 'dogeusdt', name: 'Dogecoin' },
  { symbol: 'maticusdt', name: 'Polygon' },
  { symbol: 'ltcusdt', name: 'Litecoin' },
  { symbol: 'trxusdt', name: 'TRON' },
  { symbol: 'dotusdt', name: 'Polkadot' },
  { symbol: 'avaxusdt', name: 'Avalanche' },
  { symbol: 'linkusdt', name: 'Chainlink' },
  { symbol: 'atomusdt', name: 'Cosmos' },
  { symbol: 'uniusdt', name: 'Uniswap' },
];

type ConnectionStatus = 'connecting' | 'connected' | 'disconnected' | 'error';

const MarketRow = React.memo(
  ({
    item,
    priceState,
    selected,
    onSelect,
  }: {
    item: { symbol: string; name: string };
    priceState?: PriceState;
    selected: string;
    onSelect: (symbol: string) => void;
  }) => {
    const price = priceState?.price ?? 0;
    const open = priceState?.open ?? price;
    const change = price - open;
    const percent = open !== 0 ? ((change / open) * 100).toFixed(2) : '0.00';

    const isUp = change >= 0;

    return (
      <Pressable
        onPress={() => onSelect(item.symbol)}
        style={[styles.card, item.symbol === selected && styles.selectedCard]}
      >
        <View>
          <Text style={styles.coinName}>{item.name}</Text>
          <Text style={styles.symbol}>{item.symbol.toUpperCase()}</Text>
        </View>

        <View style={styles.itemEnd}>
          <Text style={styles.priceSmall}>${price.toFixed(2)}</Text>
          <Text
            style={[
              styles.perecentageText,
              isUp ? styles.colorGreen : styles.colorRed,
            ]}
          >
            {isUp ? '+' : ''}
            {percent}%
          </Text>
        </View>
      </Pressable>
    );
  }
);

const LiveChartScreen: React.FC = () => {
  const [selected, setSelected] = useState('btcusdt');
  const [chartData, setChartData] = useState<ChartPoint[]>([]);
  const [prices, setPrices] = useState<Record<string, PriceState>>({});
  const [search, setSearch] = useState('');
  const [connectionStatus, setConnectionStatus] =
    React.useState<ConnectionStatus>('connecting');
  const reconnectTimeout = React.useRef<NodeJS.Timeout | null>(null);

  const { state: transformState } = useChartTransformState({
    scaleX: 1.0,
    scaleY: 1.0,
  });

  const ws = useRef<WebSocket | null>(null);

  const font = useFont(require('../assets/inter-medium.ttf'), 10);

  React.useEffect(() => {
    let isMounted = true;

    const connectWebSocket = () => {
      setConnectionStatus('connecting');

      const streams = SYMBOLS.map((s) => `${s.symbol}@trade`).join('/');

      const socket = new WebSocket(
        `wss://stream.binance.com:9443/stream?streams=${streams}`
      );

      ws.current = socket;

      socket.onopen = () => {
        if (!isMounted) return;
        setConnectionStatus('connected');
        console.log('WebSocket connected');
      };

      socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        const trade = message.data;

        const symbol = trade.s.toLowerCase();
        const price = parseFloat(trade.p);

        setPrices((prev) => {
          const prevSymbol = prev[symbol];
          return {
            ...prev,
            [symbol]: {
              price,
              open: prevSymbol?.open ?? price,
            },
          };
        });

        if (symbol === selected) {
          setChartData((prev) => {
            const newData = [...prev, { time: Date.now(), price }];
            return newData.slice(-MAX_POINTS);
          });
        }
      };

      socket.onerror = () => {
        if (!isMounted) return;
        setConnectionStatus('error');
        scheduleReconnect();
      };

      socket.onclose = () => {
        if (!isMounted) return;
        setConnectionStatus('disconnected');
        scheduleReconnect();
      };
    };

    const scheduleReconnect = () => {
      if (reconnectTimeout.current) return;

      reconnectTimeout.current = setTimeout(() => {
        reconnectTimeout.current = null;
        connectWebSocket();
      }, 3000);
    };

    connectWebSocket();

    return () => {
      isMounted = false;
      ws.current?.close();
      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current);
      }
    };
  }, [selected]);

  const filteredSymbols = useMemo(() => {
    const selectedSymbol = SYMBOLS.find((s) => s.symbol === selected);

    if (!search) {
      return selectedSymbol
        ? [selectedSymbol, ...SYMBOLS.filter((s) => s.symbol !== selected)]
        : SYMBOLS;
    }

    const otherMatchedSymbols = SYMBOLS.filter(
      (s) =>
        s.symbol !== selected &&
        (s.name.toLowerCase().includes(search.toLowerCase()) ||
          s.symbol.toLowerCase().includes(search.toLowerCase()))
    );

    return selectedSymbol
      ? [selectedSymbol, ...otherMatchedSymbols]
      : otherMatchedSymbols;
  }, [search, selected]);

  const latestPrice = prices[selected]?.price?.toFixed(2) ?? '--';

  if (connectionStatus !== 'connected') {
    <View style={styles.connectionBanner}>
      <Text style={styles.connectionText}>
        {connectionStatus === 'connecting' && 'Connecting to live market...'}
        {connectionStatus === 'disconnected' &&
          'Connection lost. Reconnecting...'}
        {connectionStatus === 'error' && 'Connection error. Retrying...'}
      </Text>

      <TouchableOpacityButton
        onPress={() => {
          ws.current?.close();
          setConnectionStatus('connecting');
        }}
        buttonStyle={styles.retryButton}
        textStyle={styles.retryText}
        buttonText="Retry Now"
      />
    </View>;
  }

  return (
    <FlatList
      data={filteredSymbols}
      keyExtractor={(item) => item.symbol}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      ListHeaderComponent={
        <>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              {SYMBOLS.find((s) => s.symbol === selected)?.name}
            </Text>
            <Text style={styles.price}>${latestPrice}</Text>
          </View>

          <View style={styles.chart}>
            <CartesianChart
              data={chartData}
              xKey="time"
              yKeys={['price']}
              domainPadding={{ top: 20, bottom: 20 }}
              transformState={transformState}
              yAxis={[
                {
                  font,
                },
              ]}
            >
              {({ points }) => (
                <Line
                  points={points.price}
                  strokeWidth={3}
                  color="#2979FF"
                  animate={{ type: 'timing', duration: 300 }}
                />
              )}
            </CartesianChart>
          </View>

          <Text style={styles.section}>Market Watch</Text>

          <TextInput
            placeholder="Search crypto..."
            placeholderTextColor="#979797"
            style={styles.search}
            value={search}
            onChangeText={setSearch}
          />
        </>
      }
      initialNumToRender={20}
      renderItem={({ item }) => (
        <MarketRow
          item={item}
          priceState={prices[item.symbol]}
          selected={selected}
          onSelect={setSelected}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  perecentageText: {
    fontWeight: '600',
  },
  selectedCard: {
    backgroundColor: '#e0f2ff',
  },
  itemEnd: {
    alignItems: 'flex-end',
  },
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 18,
  },
  chart: {
    height: 280,
    width: '100%',
  },
  section: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  search: {
    color: '#000',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f1f1f1',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
  },
  coinName: {
    fontSize: 16,
    fontWeight: '600',
  },
  symbol: {
    color: 'gray',
  },
  priceSmall: {
    fontSize: 16,
    fontWeight: '600',
  },
  connectionBanner: {
    backgroundColor: '#ffe9e9',
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
  },
  connectionText: {
    color: '#c62828',
    fontWeight: '500',
    marginBottom: 6,
  },
  retryButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#c62828',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  retryText: {
    color: '#fff',
    fontWeight: '600',
  },
  colorGreen: {
    color: 'green',
  },
  colorRed: {
    color: 'red',
  },
});

export default LiveChartScreen;
