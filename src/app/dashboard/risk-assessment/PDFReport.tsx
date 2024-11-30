import React, { useState } from 'react'
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer'
import { Button } from '@/components/ui/button'
import { IconPicker } from '@/components/ui/icon-picker'
import toast from 'react-hot-toast'

// PDF Report Styles
const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { margin: 10, padding: 10 },
  title: { fontSize: 24, marginBottom: 10 },
  subtitle: { fontSize: 18, marginBottom: 8 },
  text: { fontSize: 12, marginBottom: 5 },
  table: {
    display: 'flex',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  tableRow: { flexDirection: 'row' },
  tableCol: { width: '50%', borderStyle: 'solid', borderWidth: 1, padding: 5 },
})

const PDFReport = ({ data, personalInfo }: any) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Health Risk Assessment Report</Text>
        <Text style={styles.text}>Date: {new Date().toLocaleDateString()}</Text>
        <Text style={styles.text}>Patient: {personalInfo.fullName}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Risk Assessment Summary</Text>
        <Text style={styles.text}>Overall Risk Score: {data.riskScore}%</Text>

        {/* <Text style={styles.subtitle}>Key Risk Indicators</Text>
        {data.keyIndicators?.map((indicator, index) => (
          <Text key={index} style={styles.text}>
            • {indicator.title}: {indicator.description}
          </Text>
        ))} */}

        <Text style={styles.subtitle}>Recommendations</Text>
        {[data.followUpAction, data.lifestyleModification].map((rec, index) => (
          <Text key={index} style={styles.text}>
            • {rec}
          </Text>
        ))}
      </View>
    </Page>
  </Document>
)

// Report Actions Component
export const ReportActions = ({ assessmentData, personalInfo }: any) => {
  const [isEmailSent, setIsEmailSent] = useState(false)

  const handleEmailReport = async () => {
    try {
      // Implement email sending logic here
      //   await sendReportEmail(assessmentData)
      setIsEmailSent(true)
      toast.success('Report sent successfully')
    } catch (error) {
      toast.error('Failed to send report')
    }
  }

  return (
    <div className="flex gap-4 mt-6">
      <PDFDownloadLink
        document={
          <PDFReport data={assessmentData} personalInfo={personalInfo} />
        }
        fileName={`${personalInfo.fullName}-health-risk-assessment.pdf`}
      >
        {
          (({ loading = false }) => (
            <Button
              variant="primary"
              disabled={loading}
              leadingIcon={<IconPicker icon="document" />}
            >
              {loading ? 'Generating PDF...' : 'Download Report'}
            </Button>
          )) as any
        }
      </PDFDownloadLink>

      <Button
        variant="secondary"
        onClick={handleEmailReport}
        disabled={isEmailSent}
        leadingIcon={<IconPicker icon="mail" />}
      >
        {isEmailSent ? 'Report Sent' : 'Email Report'}
      </Button>
    </div>
  )
}
