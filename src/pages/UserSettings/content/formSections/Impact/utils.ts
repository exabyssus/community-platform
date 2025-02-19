import { impactQuestions } from '../Impact/impactQuestions'

import type { IImpactDataField, IImpactYearFieldList } from 'src/models'
import type { IImpactQuestion } from '../Impact/impactQuestions'

export interface ImpactDataFieldInputs {
  [key: string]: IImpactQuestion
}

interface IInputs {
  [key: string]: IImpactDataField
}

export const transformImpactData = (
  fields: IImpactYearFieldList,
): ImpactDataFieldInputs => {
  const transformed = {} as ImpactDataFieldInputs

  Object.values(fields).forEach((field) => {
    const questionField = impactQuestions.find(
      (question) => question.id === field.id,
    )
    return (transformed[field.id] = {
      ...questionField,
      ...field,
    } as IImpactQuestion)
  })

  return transformed
}

export const transformImpactInputs = (
  inputs: IInputs,
): IImpactYearFieldList => {
  const fields = [] as IImpactYearFieldList

  Object.keys(inputs).forEach((key) => {
    const field = inputs[key]
    const question = impactQuestions.find(({ id }) => id === key)

    if (field && question && field.value) {
      fields.push({
        id: question.id,
        value: field.value,
        isVisible:
          typeof field.isVisible === 'boolean' ? field.isVisible : true,
      })
    }
  })

  return fields
}
