import React from 'react';
import { Document, Page, View, Text } from '@react-pdf/renderer';

export default function ContratoPDF() {
    return (
        <Document>
            <Page size='A4'>
                <View>
                    <Text>Hola</Text>
                </View>
            </Page>
        </Document>
    );
}
