/* eslint-disable react/no-children-prop */
'use client'

import { z } from 'zod'
import { useAppForm } from './form-components'
import { FieldErrors } from './form-components/field-errors'

// #region schemas and defaults
// const ContactMethod = z.union([
//   z.literal('email'),
//   z.literal('phone'),
//   z.literal('whatsapp'),
//   z.literal('sms')
// ])
// type ContactMethod = z.infer<typeof ContactMethod>

// const ContactMethods = ContactMethod.options.map(({ value }) => ({
//   value,
//   label: value.charAt(0).toUpperCase() + value.slice(1)
// }))

const product_price = z
  .string()
  .refine(value => Number(value), 'Price must have exactly two decimal places')

const ProductSchema = z.object({
  title: z
    .string()
    .regex(/^[A-Z]/, 'Name must start with a capital letter')
    .min(3, 'Name must be at least 3 characters long'),
  price: z.coerce
    .number({ message: 'Discount percentage is required' })

    .min(1, 'Price must be 1 or greater')
    .max(100),
  description: z
    .string()
    .min(10, 'Description must be at least 3 characters long')
    .regex(/^[A-Z]/, 'Surname must start with a capital letter')

  //   isAcceptingTerms: z.boolean().refine(val => val, {
  //     message: 'You must accept the terms and conditions'
  //   }),
})
type Product = z.infer<typeof ProductSchema>

const defaultProduct = {
  title: '',
  price: 0,
  description: ''
  //   isAcceptingTerms: false,
  //   contact: {
  //     email: '',
  //     phone: '',
  //     preferredContactMethod: 'email'
  //   }
} as Product
// #endregion

export const ProductForm = () => {
  const form = useAppForm({
    defaultValues: defaultProduct,
    validators: {
      onChange: ProductSchema
    },
    onSubmit: ({ value }) => {
      console.log('Form submitted:', value)
    }
  })

  return (
    <form
      className='flex w-[400px] flex-col gap-2'
      onSubmit={e => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <form.AppField
        name='title'
        children={field => <field.TextField label='Product title' />}
      />
      <form.Field name='price'>
        {field => {
          return (
            <div className='mb-2 flex flex-col'>
              <label htmlFor='price'>Price</label>
              <input
                className='border p-2'
                name='price'
                id='price'
                type='number'
                value={field.state.value.toString()}
                onChange={e => field.handleChange(e.target.valueAsNumber)}
              />
              <FieldErrors meta={field.state.meta} />
            </div>
          )
        }}
      </form.Field>

      <form.AppField
        name='description'
        children={field => <field.TextField label='Description' />}
      />
      {/* <form.AppField
        name='isAcceptingTerms'
        children={field => (
          <field.CheckboxField label='I accept the terms and conditions' />
        )}
      /> */}

      {/* <div className='my-2'>
        <h3 className='text-lg font-medium'>Contacts</h3>
        <div className='flex-col gap-4'>
          <form.AppField
            name='contact.email'
            children={field => <field.TextField label='Email' type='email' />}
          />
          <form.AppField
            name='contact.phone'
            children={field => <field.TextField label='Phone' />}
          />
          <form.AppField
            name='contact.preferredContactMethod'
            children={field => (
              <field.SelectField
                label='Preferred Contact Method'
                options={ContactMethods}
              />
            )}
          />
        </div>
      </div> */}
      <form.AppForm>
        <form.SubmitButton>Submit</form.SubmitButton>
      </form.AppForm>
    </form>
  )
}
