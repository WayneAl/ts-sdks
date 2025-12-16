// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { DAppKitProvider, ConnectButton } from '@mysten/dapp-kit-react';
import { dAppKit } from './dApp-kit.ts';
import { ListDynamicFields } from './ListDynamicFields';

export default function ClientOnlyConnectButton() {
	return (
		<DAppKitProvider dAppKit={dAppKit}>
			<ConnectButton />
			<ListDynamicFields />
			{/* 0xe034d157764f273df5a1e264a3c0f78d8f922c37f942c340dabb1d66244c72ba */}
		</DAppKitProvider>
	);
}
