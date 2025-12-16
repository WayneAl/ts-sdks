'use client';

import { useDAppKit } from '@mysten/dapp-kit-react';
import { useState } from 'react';

export function ListDynamicFields() {
	const dAppKit = useDAppKit();
	const [parent, setParent] = useState('');
	const [results, setResults] = useState<string[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleFetch = async () => {
		if (!parent) {
			setError('Parent ID is required.');
			return;
		}
		setLoading(true);
		setError(null);
		setResults([]);

		try {
			const { response } = await dAppKit.getClient().stateService.listDynamicFields({
				parent,
				readMask: { paths: ["child_object"] },
			});
			const values = response.dynamicFields.map((field) => {
				return field.childObject?.contents?.value!;
			});
			setResults([values.toString()]);
		} catch (e: any) {
			setError(`Error fetching dynamic fields: ${e.message}`);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div style={{ marginTop: '20px' }}>
			<h2>List Dynamic Fields</h2>
			<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
				<input
					type="text"
					value={parent}
					onChange={(e) => setParent(e.target.value)}
					placeholder="Enter Parent Object ID"
					style={{ padding: '8px', width: '300px' }}
				/>
				<button onClick={handleFetch} disabled={loading} style={{ padding: '8px 12px' }}>
					{loading ? 'Fetching...' : 'Fetch Dynamic Fields'}
				</button>
			</div>
			{error && <p style={{ color: 'red' }}>{error}</p>}
			{results.length > 0 && (
				<div>
					<h3>Results:</h3>
					<ul>
						{results.map((result, index) => (
							<li key={index}>{result}</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}