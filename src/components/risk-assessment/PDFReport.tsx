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
import { useFormContext } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import baseAxios from '@/utils/baseAxios'
import { API } from '@/utils/api'
import { PersonalInfo, RiskData } from '@/hooks/queries/useRiskAssessment'
import calculateAge from '@/utils/calculateAge'
import { categorizeBMIWHO2007 } from '@/utils/vitalCalculations'

const siteUrl =
  process.env.ENV === 'development'
    ? 'https://dev.play4health.forcardio.app'
    : 'https://scrinar.com'

// Enhanced PDF Report Styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#ffffff',
  },
  section: {
    margin: 10,
    padding: 10,
    borderBottom: 1,
    borderColor: '#e5e7eb',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: '#1a56db',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 8,
    color: '#374151',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    color: '#4b5563',
  },
  table: {
    display: 'flex',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    marginVertical: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
  },
  tableCol: {
    width: '50%',
    padding: 8,
    borderRightWidth: 1,
    borderColor: '#e5e7eb',
  },
  riskIndicator: {
    marginVertical: 5,
    padding: 8,
    backgroundColor: '#f3f4f6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 40,
  },
})

// PDF Document Component
const PDFReport = ({
  data,
  personalInfo,
}: {
  data: RiskData
  personalInfo: PersonalInfo
}) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date)
  }
  const vitals = data?.vitals

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.title}>Health Risk Assessment Report</Text>
          <Text style={styles.text}>{formatDate(new Date())}</Text>
        </View>

        {/* Personal Information */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Personal Information</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text>Full Name</Text>
              </View>
              <View style={styles.tableCol}>
                <Text>{personalInfo.fullName}</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text>Age</Text>
              </View>
              <View style={styles.tableCol}>
                <Text>{calculateAge(personalInfo.dateOfBirth)} years</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text>Gender</Text>
              </View>
              <View style={styles.tableCol}>
                <Text>{personalInfo.gender}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Vitals Section */}
        {vitals && (
          <View style={styles.section}>
            <Text style={styles.subtitle}>Vital Measurements</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text>Height</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text>{vitals.height} CM</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text>Weight</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text>{vitals.weight} KG</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text>BMI</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text>{vitals.bmi} kg/m²</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text>BMI Category</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text>
                    {categorizeBMIWHO2007(
                      calculateAge(personalInfo.dateOfBirth),
                      personalInfo.gender.toLowerCase(),
                      vitals.bmi
                    )?.message?.slice(
                      0,
                      -2
                    ) //remove emoji
                    }
                  </Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text>Waist Circumference</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text>{vitals.waist} CM</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text>Pulse Rate</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text>{vitals.pulse} BPM</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* WHO Risk Assessment */}
        {data?.who && (
          <View style={styles.section}>
            <Text style={styles.subtitle}>
              Cardiovascular Risk Assessment (WHO)
            </Text>
            <View style={styles.riskIndicator}>
              <Text style={styles.text}>Risk Score: {data?.who.score}%</Text>
              <Text style={styles.text}>
                Risk Level: {data?.who?.riskLevel}
              </Text>
            </View>

            <Text style={styles.subtitle}>Risk Factors</Text>
            {Object.entries(data?.who?.breakdown).map(([factor, value]) => (
              <Text key={factor} style={styles.text}>
                • {factor.charAt(0).toUpperCase() + factor.slice(1)}: {value}
              </Text>
            ))}
          </View>
        )}

        {/* FINDRISC Assessment */}
        {data?.findrisc && (
          <View style={styles.section}>
            <Text style={styles.subtitle}>
              Diabetes Risk Assessment (FINDRISC)
            </Text>
            <View style={styles.riskIndicator}>
              <Text style={styles.text}>
                Risk Score: {data?.findrisc?.score}%
              </Text>
              <Text style={styles.text}>
                Risk Level: {data?.findrisc?.riskLevel}
              </Text>
            </View>
          </View>
        )}

        {/* Recommendations */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Medical Recommendations</Text>
          {data?.who && (
            <>
              <Text style={styles.text}>
                Follow-up Action: {data?.who.followUpAction}
              </Text>
              <Text style={styles.text}>
                Lifestyle Modifications: {data?.who.lifestyleModification}
              </Text>
              <Text style={styles.text}>
                Personal Advice: {data?.who.personalizedAdvice}
              </Text>
            </>
          )}
        </View>

        {/* Critical Alerts */}
        {data?.criticalAlerts && data?.criticalAlerts.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.subtitle}>Important Health Alerts</Text>
            {data?.criticalAlerts.map((alert, index) => (
              <View key={index} style={styles.riskIndicator}>
                <Text style={styles.text}>{alert.title}</Text>
                <Text style={styles.text}>{alert.description}</Text>
              </View>
            ))}
          </View>
        )}

        {data?.criticalAlerts && data?.criticalAlerts.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.subtitle}>Important Health Alerts</Text>
            {data?.criticalAlerts.map((alert, index) => (
              <View key={index} style={styles.riskIndicator}>
                <Text style={styles.text}>{alert.title}</Text>
                <Text style={styles.text}>{alert.description}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Footer */}
        <View style={styles.section}>
          <Text style={styles.text}>
            This report was generated by Scrinar on {formatDate(new Date())}
          </Text>
          <Text style={styles.text}>
            For more information, visit: {siteUrl}
          </Text>
        </View>
      </Page>
    </Document>
  )
}
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
  assessmentId,
}: {
  assessmentData: RiskData
  personalInfo: PersonalInfo
  assessmentId?: string
  isFromEmail?: boolean
}) => {
  const [isEmailSent, setIsEmailSent] = useState(false)

  const formContext = useFormContext()

  const consentAgreement =
    formContext?.watch?.('consentAgreement') ?? !assessmentId
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
        url: `${siteUrl}/risk-assessment/${assessmentId}`,
      })
    } catch (error) {
      console.error('Error sending report:', error)
    }
  }

  return (
    <div className="flex gap-4 mt-6">
      <PDFDownloadLink
        document={
          <PDFReport data={assessmentData} personalInfo={personalInfo} />
        }
        fileName={`${personalInfo?.fullName}-health-risk-assessment.pdf`}
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

      {assessmentId && (
        <Button
          type="button"
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
