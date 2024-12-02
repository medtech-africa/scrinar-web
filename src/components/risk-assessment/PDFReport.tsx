import React, { useRef, useState } from 'react'
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
import { useFormContext } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import baseAxios from '@/utils/baseAxios'
import { API } from '@/utils/api'

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

const sendReportEmail = async ({ email, pdfUrl }: any) => {
  return baseAxios.post(API.sendRiskAssessment, {
    email,
    pdfUrl,
  })
}

// Report Actions Component
export const ReportActions = ({
  assessmentData,
  personalInfo,
  isFromEmail = false,
}: any) => {
  const [isEmailSent, setIsEmailSent] = useState(false)
  const downloadLink = useRef<any>(null)

  const formContext = useFormContext()

  const consentAgreement =
    formContext?.watch?.('consentAgreement') ?? isFromEmail
  const reportEmail = formContext?.watch?.('reportEmail')

  const { mutateAsync: sendEmailMutation } = useMutation({
    mutationFn: sendReportEmail,
    onSuccess: () => {
      setIsEmailSent(true)
      toast.success('Report sent successfully to ' + reportEmail)
    },
    onError: () => {
      toast.error('Failed to send report email')
    },
  })

  // Updated handleEmailReport function
  const handleEmailReport = async () => {
    try {
      await sendEmailMutation({
        email: reportEmail,
        pdfUrl: downloadLink.current.href,
      })
    } catch (error) {
      console.error('Error sending report:', error)
    }
  }

  return (
    <div className="flex gap-4 mt-6">
      <PDFDownloadLink
        ref={downloadLink}
        document={
          <PDFReport data={assessmentData} personalInfo={personalInfo} />
        }
        fileName={`${personalInfo.fullName}-health-risk-assessment.pdf`}
      >
        {
          (({ loading = false }) => (
            <Button
              variant="primary"
              disabled={loading || !consentAgreement}
              leadingIcon={<IconPicker icon="document" />}
            >
              {loading ? 'Generating PDF...' : 'Download Report'}
            </Button>
          )) as any
        }
      </PDFDownloadLink>

      {!isFromEmail && (
        <Button
          variant="secondary"
          onClick={handleEmailReport}
          disabled={isEmailSent || !consentAgreement}
          leadingIcon={<IconPicker icon="mail" />}
        >
          {isEmailSent ? 'Report Sent' : 'Email Report'}
        </Button>
      )}
    </div>
  )
}
