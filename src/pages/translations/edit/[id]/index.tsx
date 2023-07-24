import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { getTranslationById, updateTranslationById } from 'apiSdk/translations';
import { translationValidationSchema } from 'validationSchema/translations';
import { TranslationInterface } from 'interfaces/translation';
import { NewsInterface } from 'interfaces/news';
import { getNews } from 'apiSdk/news';

function TranslationEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<TranslationInterface>(
    () => (id ? `/translations/${id}` : null),
    () => getTranslationById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: TranslationInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateTranslationById(id, values);
      mutate(updated);
      resetForm();
      router.push('/translations');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<TranslationInterface>({
    initialValues: data,
    validationSchema: translationValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Translations',
              link: '/translations',
            },
            {
              label: 'Update Translation',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Translation
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.language}
            label={'Language'}
            props={{
              name: 'language',
              placeholder: 'Language',
              value: formik.values?.language,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.translated_text}
            label={'Translated Text'}
            props={{
              name: 'translated_text',
              placeholder: 'Translated Text',
              value: formik.values?.translated_text,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<NewsInterface>
            formik={formik}
            name={'news_id'}
            label={'Select News'}
            placeholder={'Select News'}
            fetcher={getNews}
            labelField={'title'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/translations')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'translation',
    operation: AccessOperationEnum.UPDATE,
  }),
)(TranslationEditPage);
