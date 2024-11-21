import { PageCard } from '@/components/ui/page-card'
import { Text } from '@/components/ui/text'

import { ParentFormData } from '@/types/questionnaire.types'
import { Checkbox } from '@/components/ui/checkbox'
import { Control, Controller, FieldErrors, UseFormWatch } from 'react-hook-form'

interface Props {
  control: Control<ParentFormData, ParentFormData>
  errors: FieldErrors<ParentFormData>
  watch: UseFormWatch<ParentFormData>
}

export const HealthHistorySection = ({ control, watch }: Props) => {
  return (
    <div className="space-y-6">
      <h3 className="sr-only">Health History</h3>

      {/* Blood Pressure History */}
      <PageCard title="History of Raised Blood Pressure" bodyStyle="p-4">
        <div className="space-y-4">
          <Controller
            control={control}
            name="healthHistory.bloodPressure.measured"
            render={({ field: { onChange, value } }) => (
              <div className="space-y-2">
                <Text className="lg:text-sm text-xs font-medium">
                  Have you ever had your blood pressure measured by a doctor or
                  other health worker?
                </Text>
                <div className="flex space-x-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={value}
                      onCheckedChange={() => onChange(true)}
                    />
                    <Text className="text-sm">Yes</Text>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={value === false}
                      onCheckedChange={() => onChange(false)}
                    />
                    <Text className="text-sm">No</Text>
                  </div>
                </div>
              </div>
            )}
          />

          {watch('healthHistory.bloodPressure.measured') && (
            <div className="space-y-4 pl-4">
              <Controller
                control={control}
                name="healthHistory.bloodPressure.diagnosed"
                render={({ field: { onChange, value } }) => (
                  <div className="space-y-2">
                    <Text className="lg:text-sm text-xs font-medium">
                      Have you ever been told by a doctor or other health worker
                      that you have raised blood pressure or hypertension?
                    </Text>
                    <div className="flex items-center space-x-2">
                      <Checkbox checked={value} onCheckedChange={onChange} />
                      <Text className="text-sm">Yes</Text>
                    </div>
                  </div>
                )}
              />

              {watch('healthHistory.bloodPressure.diagnosed') && (
                <>
                  <Controller
                    control={control}
                    name="healthHistory.bloodPressure.diagnosedLast12Months"
                    render={({ field: { onChange, value } }) => (
                      <div className="space-y-2">
                        <Text className="lg:text-sm text-xs font-medium">
                          Were you first told in the past 12 months?
                        </Text>
                        <div className="flex space-x-3">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              checked={value}
                              onCheckedChange={() => onChange(true)}
                            />
                            <Text className="text-sm">Yes</Text>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              checked={value === false}
                              onCheckedChange={() => onChange(false)}
                            />
                            <Text className="text-sm">No</Text>
                          </div>
                        </div>
                      </div>
                    )}
                  />

                  <Controller
                    control={control}
                    name="healthHistory.bloodPressure.medication"
                    render={({ field: { onChange, value } }) => (
                      <div className="space-y-2">
                        <Text className="lg:text-sm text-xs font-medium">
                          In the past two weeks, have you taken any drugs
                          (medication) for raised blood pressure prescribed by a
                          doctor or other health worker?
                        </Text>
                        <div className="flex space-x-3">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              checked={value}
                              onCheckedChange={() => onChange(true)}
                            />
                            <Text className="text-sm">Yes</Text>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              checked={value === false}
                              onCheckedChange={() => onChange(false)}
                            />
                            <Text className="text-sm">No</Text>
                          </div>
                        </div>
                      </div>
                    )}
                  />

                  <Controller
                    control={control}
                    name="healthHistory.bloodPressure.traditionalHealer"
                    render={({ field: { onChange, value } }) => (
                      <div className="space-y-2">
                        <Text className="lg:text-sm text-xs font-medium">
                          Have you ever seen a traditional healer for raised
                          blood pressure or hypertension?
                        </Text>
                        <div className="flex space-x-3">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              checked={value}
                              onCheckedChange={() => onChange(true)}
                            />
                            <Text className="text-sm">Yes</Text>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              checked={value === false}
                              onCheckedChange={() => onChange(false)}
                            />
                            <Text className="text-sm">No</Text>
                          </div>
                        </div>
                      </div>
                    )}
                  />

                  <Controller
                    control={control}
                    name="healthHistory.bloodPressure.traditionalRemedy"
                    render={({ field: { onChange, value } }) => (
                      <div className="space-y-2">
                        <Text className="lg:text-sm text-xs font-medium">
                          Are you currently taking any herbal or traditional
                          remedy for your raised blood pressure?
                        </Text>
                        <div className="flex space-x-3">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              checked={value}
                              onCheckedChange={() => onChange(true)}
                            />
                            <Text className="text-sm">Yes</Text>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              checked={value === false}
                              onCheckedChange={() => onChange(false)}
                            />
                            <Text className="text-sm">No</Text>
                          </div>
                        </div>
                      </div>
                    )}
                  />
                </>
              )}
            </div>
          )}
        </div>
      </PageCard>

      {/* Diabetes History */}
      <PageCard title="History of Diabetes" bodyStyle="p-4">
        <div className="space-y-4">
          <Controller
            control={control}
            name="healthHistory.diabetes.measured"
            render={({ field: { onChange, value } }) => (
              <div className="space-y-2">
                <Text className="lg:text-sm text-xs font-medium">
                  Have you ever had your blood sugar measured by a doctor or
                  other health worker?
                </Text>
                <div className="flex space-x-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={value}
                      onCheckedChange={() => onChange(true)}
                    />
                    <Text className="text-sm">Yes</Text>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={value === false}
                      onCheckedChange={() => onChange(false)}
                    />
                    <Text className="text-sm">No</Text>
                  </div>
                </div>
              </div>
            )}
          />

          {watch('healthHistory.diabetes.measured') && (
            <div className="space-y-4 pl-4">
              <Controller
                control={control}
                name="healthHistory.diabetes.diagnosed"
                render={({ field: { onChange, value } }) => (
                  <div className="space-y-2">
                    <Text className="lg:text-sm text-xs font-medium">
                      Have you ever been told by a doctor or other health worker
                      that you have raised blood sugar or diabetes?
                    </Text>
                    <div className="flex items-center space-x-2">
                      <Checkbox checked={value} onCheckedChange={onChange} />
                      <Text className="text-sm">Yes</Text>
                    </div>
                  </div>
                )}
              />

              {watch('healthHistory.diabetes.diagnosed') && (
                <>
                  <Controller
                    control={control}
                    name="healthHistory.diabetes.diagnosedLast12Months"
                    render={({ field: { onChange, value } }) => (
                      <div className="space-y-2">
                        <Text className="lg:text-sm text-xs font-medium">
                          Were you first told in the past 12 months?
                        </Text>
                        <div className="flex space-x-3">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              checked={value}
                              onCheckedChange={() => onChange(true)}
                            />
                            <Text className="text-sm">Yes</Text>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              checked={value === false}
                              onCheckedChange={() => onChange(false)}
                            />
                            <Text className="text-sm">No</Text>
                          </div>
                        </div>
                      </div>
                    )}
                  />

                  <Controller
                    control={control}
                    name="healthHistory.diabetes.medication"
                    render={({ field: { onChange, value } }) => (
                      <div className="space-y-2">
                        <Text className="lg:text-sm text-xs font-medium">
                          In the past two weeks, have you taken any drugs
                          (medication) for diabetes prescribed by a doctor or
                          other health worker?
                        </Text>
                        <div className="flex space-x-3">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              checked={value}
                              onCheckedChange={() => onChange(true)}
                            />
                            <Text className="text-sm">Yes</Text>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              checked={value === false}
                              onCheckedChange={() => onChange(false)}
                            />
                            <Text className="text-sm">No</Text>
                          </div>
                        </div>
                      </div>
                    )}
                  />

                  <Controller
                    control={control}
                    name="healthHistory.diabetes.insulin"
                    render={({ field: { onChange, value } }) => (
                      <div className="space-y-2">
                        <Text className="lg:text-sm text-xs font-medium">
                          Are you currently taking insulin for diabetes
                          prescribed by a doctor or other health worker?
                        </Text>
                        <div className="flex space-x-3">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              checked={value}
                              onCheckedChange={() => onChange(true)}
                            />
                            <Text className="text-sm">Yes</Text>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              checked={value === false}
                              onCheckedChange={() => onChange(false)}
                            />
                            <Text className="text-sm">No</Text>
                          </div>
                        </div>
                      </div>
                    )}
                  />

                  <Controller
                    control={control}
                    name="healthHistory.diabetes.traditionalHealer"
                    render={({ field: { onChange, value } }) => (
                      <div className="space-y-2">
                        <Text className="lg:text-sm text-xs font-medium">
                          Have you ever seen a traditional healer for diabetes
                          or raised blood sugar?
                        </Text>
                        <div className="flex space-x-3">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              checked={value}
                              onCheckedChange={() => onChange(true)}
                            />
                            <Text className="text-sm">Yes</Text>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              checked={value === false}
                              onCheckedChange={() => onChange(false)}
                            />
                            <Text className="text-sm">No</Text>
                          </div>
                        </div>
                      </div>
                    )}
                  />

                  <Controller
                    control={control}
                    name="healthHistory.diabetes.traditionalRemedy"
                    render={({ field: { onChange, value } }) => (
                      <div className="space-y-2">
                        <Text className="lg:text-sm text-xs font-medium">
                          Are you currently taking any herbal or traditional
                          remedy for your diabetes?
                        </Text>
                        <div className="flex space-x-3">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              checked={value}
                              onCheckedChange={() => onChange(true)}
                            />
                            <Text className="text-sm">Yes</Text>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              checked={value === false}
                              onCheckedChange={() => onChange(false)}
                            />
                            <Text className="text-sm">No</Text>
                          </div>
                        </div>
                      </div>
                    )}
                  />
                </>
              )}
            </div>
          )}
        </div>
      </PageCard>

      {/* Cholesterol History */}
      <PageCard title="History of Raised Total Cholesterol" bodyStyle="p-4">
        <div className="space-y-4">
          <Controller
            control={control}
            name="healthHistory.cholesterol.measured"
            render={({ field: { onChange, value } }) => (
              <div className="space-y-2">
                <Text className="lg:text-sm text-xs font-medium">
                  Have you ever had your cholesterol (fat levels in your blood)
                  measured by a doctor or other health worker?
                </Text>
                <div className="flex space-x-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={value}
                      onCheckedChange={() => onChange(true)}
                    />
                    <Text className="text-sm">Yes</Text>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={value === false}
                      onCheckedChange={() => onChange(false)}
                    />
                    <Text className="text-sm">No</Text>
                  </div>
                </div>
              </div>
            )}
          />

          {watch('healthHistory.cholesterol.measured') && (
            <div className="space-y-4 pl-4">
              <Controller
                control={control}
                name="healthHistory.cholesterol.diagnosed"
                render={({ field: { onChange, value } }) => (
                  <div className="space-y-2">
                    <Text className="lg:text-sm text-xs font-medium">
                      Have you ever been told by a doctor or other health worker
                      that you have raised cholesterol?
                    </Text>
                    <div className="flex items-center space-x-2">
                      <Checkbox checked={value} onCheckedChange={onChange} />
                      <Text className="text-sm">Yes</Text>
                    </div>
                  </div>
                )}
              />

              {watch('healthHistory.cholesterol.diagnosed') && (
                <>
                  <Controller
                    control={control}
                    name="healthHistory.cholesterol.diagnosedLast12Months"
                    render={({ field: { onChange, value } }) => (
                      <div className="space-y-2">
                        <Text className="lg:text-sm text-xs font-medium">
                          Were you first told in the past 12 months?
                        </Text>
                        <div className="flex space-x-3">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              checked={value}
                              onCheckedChange={() => onChange(true)}
                            />
                            <Text className="text-sm">Yes</Text>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              checked={value === false}
                              onCheckedChange={() => onChange(false)}
                            />
                            <Text className="text-sm">No</Text>
                          </div>
                        </div>
                      </div>
                    )}
                  />

                  <Controller
                    control={control}
                    name="healthHistory.cholesterol.medication"
                    render={({ field: { onChange, value } }) => (
                      <div className="space-y-2">
                        <Text className="lg:text-sm text-xs font-medium">
                          In the past two weeks, have you taken any oral
                          treatment (medication) for raised total cholesterol
                          prescribed by a doctor or other health worker?
                        </Text>
                        <div className="flex space-x-3">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              checked={value}
                              onCheckedChange={() => onChange(true)}
                            />
                            <Text className="text-sm">Yes</Text>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              checked={value === false}
                              onCheckedChange={() => onChange(false)}
                            />
                            <Text className="text-sm">No</Text>
                          </div>
                        </div>
                      </div>
                    )}
                  />

                  <Controller
                    control={control}
                    name="healthHistory.cholesterol.traditionalHealer"
                    render={({ field: { onChange, value } }) => (
                      <div className="space-y-2">
                        <Text className="lg:text-sm text-xs font-medium">
                          Have you ever seen a traditional healer for raised
                          cholesterol?
                        </Text>
                        <div className="flex space-x-3">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              checked={value}
                              onCheckedChange={() => onChange(true)}
                            />
                            <Text className="text-sm">Yes</Text>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              checked={value === false}
                              onCheckedChange={() => onChange(false)}
                            />
                            <Text className="text-sm">No</Text>
                          </div>
                        </div>
                      </div>
                    )}
                  />

                  <Controller
                    control={control}
                    name="healthHistory.cholesterol.traditionalRemedy"
                    render={({ field: { onChange, value } }) => (
                      <div className="space-y-2">
                        <Text className="lg:text-sm text-xs font-medium">
                          Are you currently taking any herbal or traditional
                          remedy for your raised cholesterol?
                        </Text>
                        <div className="flex space-x-3">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              checked={value}
                              onCheckedChange={() => onChange(true)}
                            />
                            <Text className="text-sm">Yes</Text>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              checked={value === false}
                              onCheckedChange={() => onChange(false)}
                            />
                            <Text className="text-sm">No</Text>
                          </div>
                        </div>
                      </div>
                    )}
                  />
                </>
              )}
            </div>
          )}
        </div>
      </PageCard>

      {/* Cardiovascular Disease History */}
      <PageCard title="History of Cardiovascular Diseases" bodyStyle="p-4">
        <div className="space-y-4">
          <Controller
            control={control}
            name="healthHistory.cardiovascular.hadEvent"
            render={({ field: { onChange, value } }) => (
              <div className="space-y-2">
                <Text className="lg:text-sm text-xs font-medium">
                  Have you ever had a heart attack or chest pain from heart
                  disease (angina) or a stroke (cerebrovascular accident or
                  incident)?
                </Text>
                <div className="flex space-x-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={value}
                      onCheckedChange={() => onChange(true)}
                    />
                    <Text className="text-sm">Yes</Text>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={value === false}
                      onCheckedChange={() => onChange(false)}
                    />
                    <Text className="text-sm">No</Text>
                  </div>
                </div>
              </div>
            )}
          />

          {watch('healthHistory.cardiovascular.hadEvent') && (
            <div className="space-y-4 pl-4">
              <Controller
                control={control}
                name="healthHistory.cardiovascular.aspirin"
                render={({ field: { onChange, value } }) => (
                  <div className="space-y-2">
                    <Text className="lg:text-sm text-xs font-medium">
                      Are you currently taking aspirin regularly i.e. daily or
                      almost everyday to prevent or treat heart disease?
                    </Text>
                    <div className="flex items-center space-x-2">
                      <Checkbox checked={value} onCheckedChange={onChange} />
                      <Text className="text-sm">Yes</Text>
                    </div>
                  </div>
                )}
              />

              <Controller
                control={control}
                name="healthHistory.cardiovascular.statins"
                render={({ field: { onChange, value } }) => (
                  <div className="space-y-2">
                    <Text className="lg:text-sm text-xs font-medium">
                      Are you currently taking statins
                      (Lovastatin/Simvastatin/Atorvastatin or any other statin)
                      regularly to prevent or treat heart disease?
                    </Text>
                    <div className="flex items-center space-x-2">
                      <Checkbox checked={value} onCheckedChange={onChange} />
                      <Text className="text-sm">Yes</Text>
                    </div>
                    {value && (
                      <Text className="text-xs text-gray-500 italic">
                        This includes medications like Lipitor, Crestor, Zocor,
                        or other cholesterol-lowering statins
                      </Text>
                    )}
                  </div>
                )}
              />
            </div>
          )}
        </div>
      </PageCard>
    </div>
  )
}
