/**
 * Home Page
 * Component Gallery - Demonstrates all base components
 */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Typography,
  Flex,
  Stack,
  Card,
  Button,
  Grid,
  Input,
  Textarea,
  Select,
  MultiSelect,
  Checkbox,
  Radio,
  Switch,
  Modal,
  LoadingSpinner,
  FormField,
  Tabs,
  Tooltip,
  Badge,
  Avatar,
  useToast,
  Skeleton,
  Breadcrumbs,
  Accordion,
  ProgressBar,
  DataTable,
  DatePicker,
  Slider,
} from '@components/base';
import { useIsMobile, useIsTablet, useIsDesktop } from '@hooks/index';
import { UserList } from '@widgets/UserList';
import type { SelectOption, MultiSelectOption } from '@components/base';

export const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isDesktop = useIsDesktop();
  const { showSuccess, showError, showWarning, showInfo } = useToast();

  const [selectedRole, setSelectedRole] = useState('');
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formUsername, setFormUsername] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isIndeterminate, setIsIndeterminate] = useState(true);
  const [selectedRadio, setSelectedRadio] = useState('option1');
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [sliderValue, setSliderValue] = useState(50);
  const [temperatureValue, setTemperatureValue] = useState(25);
  const [showSkeleton, setShowSkeleton] = useState(false);

  // Options for selects
  const roleOptions: SelectOption[] = [
    { value: 'admin', label: 'Administrator' },
    { value: 'user', label: 'User' },
    { value: 'guest', label: 'Guest' },
    { value: 'moderator', label: 'Moderator' },
  ];

  const multiRoleOptions: MultiSelectOption[] = [
    { value: 'admin', label: 'מנהל מערכת' },
    { value: 'user', label: 'משתמש' },
    { value: 'guest', label: 'אורח' },
    { value: 'moderator', label: 'מנהל תוכן' },
    { value: 'editor', label: 'עורך' },
  ];

  const skillOptions: MultiSelectOption[] = [
    { value: 'react', label: 'React' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'nodejs', label: 'Node.js' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'css', label: 'CSS' },
    { value: 'html', label: 'HTML' },
    { value: 'sql', label: 'SQL' },
  ];

  return (
    <Flex direction="column" gap={32}>
      {/* Hero Section */}
      <Card variant="elevated" padding="lg">
        <Flex direction="column" gap={16} align="center">
          <Typography variant="h1" align="center">
            {t('demo.title')}
          </Typography>
          <Typography variant="body1" align="center" color="text-secondary">
            {t('demo.subtitle')}
          </Typography>
        </Flex>
      </Card>

      {/* 1. Buttons Demo */}
      <Card variant="elevated" padding="lg">
        <Flex direction="column" gap={16}>
          <Typography variant="h4">{t('demo.buttons.title')}</Typography>
          <Typography variant="body2" color="text-secondary">
            {t('demo.buttons.description')}
          </Typography>

          <Flex direction="column" gap={16}>
            {/* Button Variants */}
            <Flex direction="column" gap={8}>
              <Typography variant="h6">
                Variants
              </Typography>
              <Flex direction="row" gap={12} wrap="wrap">
                <Button variant="primary">{t('common.save')}</Button>
                <Button variant="secondary">{t('common.cancel')}</Button>
                <Button variant="danger">{t('common.delete')}</Button>
                <Button variant="link">{t('common.edit')}</Button>
              </Flex>
            </Flex>

            {/* Button Sizes */}
            <Flex direction="column" gap={8}>
              <Typography variant="h6">
                Sizes
              </Typography>
              <Flex direction="row" gap={12} wrap="wrap" align="center">
                <Button variant="primary" size="sm">
                  Small
                </Button>
                <Button variant="primary" size="md">
                  Medium
                </Button>
                <Button variant="primary" size="lg">
                  Large
                </Button>
              </Flex>
            </Flex>

            {/* Button States */}
            <Flex direction="column" gap={8}>
              <Typography variant="h6">
                States
              </Typography>
              <Flex direction="row" gap={12} wrap="wrap">
                <Button variant="primary" disabled>
                  Disabled
                </Button>
                <Button variant="primary" fullWidth>
                  Full Width
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Card>

      {/* 3. Select & MultiSelect Demo */}
      <Card variant="elevated" padding="lg">
        <Flex direction="column" gap={16}>
          <Typography variant="h4">{t('demo.selects.title')}</Typography>
          <Typography variant="body2" color="text-secondary">
            {t('demo.selects.description')}
          </Typography>

          <Grid columns={{ mobile: 1, tablet: 2, desktop: 2 }} gap={16}>
            {/* Single Select */}
            <Flex direction="column" gap={8}>
              <Typography variant="h6">
                {t('demo.selects.singleSelect')}
              </Typography>
              <Select
                options={roleOptions}
                value={selectedRole}
                onChange={setSelectedRole}
                placeholder={t('demo.selects.roles')}
                searchable
                fullWidth
              />
            </Flex>

            {/* Multi Select - Roles */}
            <Flex direction="column" gap={8}>
              <Typography variant="h6">
                {t('demo.selects.multiSelect')} - {t('demo.selects.roles')}
              </Typography>
              <MultiSelect
                options={multiRoleOptions}
                value={selectedRoles}
                onChange={(values) => {
                  setSelectedRoles(values);
                  if (values.length > 0) {
                    showInfo(t('demo.selects.rolesSelected', { count: values.length }));
                  }
                }}
                placeholder={t('demo.selects.roles')}
                showSelectAll
                maxTags={3}
                fullWidth
              />
            </Flex>

            {/* Multi Select - Skills */}
            <Flex direction="column" gap={8}>
              <Typography variant="h6">
                {t('demo.selects.multiSelect')} - {t('demo.selects.skills')}
              </Typography>
              <MultiSelect
                options={skillOptions}
                value={selectedSkills}
                onChange={(values) => {
                  setSelectedSkills(values);
                  if (values.length > 0) {
                    showSuccess(t('demo.selects.skillsSelected', { count: values.length }));
                  }
                }}
                placeholder={t('demo.selects.skills')}
                searchable
                showSelectAll
                maxTags={2}
                fullWidth
              />
            </Flex>

            {/* Selected Values Display */}
            <Card variant="outlined" padding="md">
              <Flex direction="column" gap={8}>
                <Typography variant="body2">
                  <strong>{t('demo.selects.selectedRoles')}:</strong>{' '}
                  {selectedRoles.length > 0 ? selectedRoles.join(', ') : t('demo.selects.none')}
                </Typography>
                <Typography variant="body2">
                  <strong>{t('demo.selects.selectedSkills')}:</strong>{' '}
                  {selectedSkills.length > 0 ? selectedSkills.join(', ') : t('demo.selects.none')}
                </Typography>
              </Flex>
            </Card>
          </Grid>
        </Flex>
      </Card>

      {/* 4. Cards Demo */}
      <Card variant="elevated" padding="lg">
        <Flex direction="column" gap={16}>
          <Typography variant="h4">{t('demo.cards.title')}</Typography>
          <Typography variant="body2" color="text-secondary">
            {t('demo.cards.description')}
          </Typography>

          <Grid columns={{ mobile: 1, tablet: 3, desktop: 3 }} gap={16}>
            <Card variant="filled" padding="md">
              <Typography variant="h6">{t('demo.cards.flat')}</Typography>
              <Typography variant="body2" color="text-secondary">
                variant="flat"
              </Typography>
            </Card>

            <Card variant="outlined" padding="md">
              <Typography variant="h6">{t('demo.cards.outlined')}</Typography>
              <Typography variant="body2" color="text-secondary">
                variant="outlined"
              </Typography>
            </Card>

            <Card variant="elevated" padding="md">
              <Typography variant="h6">{t('demo.cards.elevated')}</Typography>
              <Typography variant="body2" color="text-secondary">
                variant="elevated"
              </Typography>
            </Card>
          </Grid>
        </Flex>
      </Card>

      {/* 5. Layout Components Demo */}
      <Card variant="elevated" padding="lg">
        <Flex direction="column" gap={16}>
          <Typography variant="h4">{t('demo.layout.title')}</Typography>
          <Typography variant="body2" color="text-secondary">
            {t('demo.layout.description')}
          </Typography>

          <Flex direction="column" gap={16}>
            {/* Flex Example */}
            <Card variant="outlined" padding="md">
              <Flex direction="column" gap={12}>
                <Typography variant="h6">
                  {t('demo.layout.flexExample')}
                </Typography>
                <Flex direction="row" gap={12} wrap="wrap" justify="between">
                  <Card variant="filled" padding="sm">
                    Item 1
                  </Card>
                  <Card variant="filled" padding="sm">
                    Item 2
                  </Card>
                  <Card variant="filled" padding="sm">
                    Item 3
                  </Card>
                </Flex>
              </Flex>
            </Card>

            {/* Grid Example */}
            <Card variant="outlined" padding="md">
              <Flex direction="column" gap={12}>
                <Typography variant="h6">
                  {t('demo.layout.gridExample')}
                </Typography>
                <Grid columns={{ mobile: 2, tablet: 3, desktop: 4 }} gap={12}>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <Card key={num} variant="filled" padding="sm">
                      Item {num}
                    </Card>
                  ))}
                </Grid>
              </Flex>
            </Card>

            {/* Stack Example */}
            <Card variant="outlined" padding="md">
              <Flex direction="column" gap={12}>
                <Typography variant="h6">
                  {t('demo.layout.stackExample')}
                </Typography>
                <Stack direction={{ mobile: 'vertical', tablet: 'horizontal' }} spacing={12}>
                  <Card variant="filled" padding="sm">
                    Stack 1
                  </Card>
                  <Card variant="filled" padding="sm">
                    Stack 2
                  </Card>
                  <Card variant="filled" padding="sm">
                    Stack 3
                  </Card>
                </Stack>
              </Flex>
            </Card>
          </Flex>
        </Flex>
      </Card>

      {/* 6. Typography Demo */}
      <Card variant="elevated" padding="lg">
        <Flex direction="column" gap={16}>
          <Typography variant="h4">{t('demo.typography.title')}</Typography>
          <Typography variant="body2" color="text-secondary">
            {t('demo.typography.description')}
          </Typography>

          <Flex direction="column" gap={12}>
            <Typography variant="h1">{t('demo.typography.heading1')}</Typography>
            <Typography variant="h2">{t('demo.typography.heading2')}</Typography>
            <Typography variant="h3">{t('demo.typography.heading3')}</Typography>
            <Typography variant="body1">{t('demo.typography.body1')}</Typography>
            <Typography variant="body2">{t('demo.typography.body2')}</Typography>
            <Typography variant="caption">{t('demo.typography.caption')}</Typography>
          </Flex>
        </Flex>
      </Card>

      {/* 7. Toast Notifications Demo */}
      <Card variant="elevated" padding="lg">
        <Flex direction="column" gap={16}>
          <Typography variant="h4">{t('demo.toast.title')}</Typography>
          <Typography variant="body2" color="text-secondary">
            {t('demo.toast.description')}
          </Typography>

          <Grid columns={{ mobile: 2, tablet: 4, desktop: 4 }} gap={12}>
            <Button
              variant="primary"
              onClick={() => showSuccess(t('demo.toast.successMessage'))}
            >
              ✓ {t('demo.toast.success')}
            </Button>
            <Button
              variant="danger"
              onClick={() => showError(t('demo.toast.errorMessage'))}
            >
              ✕ {t('demo.toast.error')}
            </Button>
            <Button
              variant="secondary"
              onClick={() => showWarning(t('demo.toast.warningMessage'))}
            >
              ⚠ {t('demo.toast.warning')}
            </Button>
            <Button
              variant="link"
              onClick={() => showInfo(t('demo.toast.infoMessage'))}
            >
              ℹ {t('demo.toast.info')}
            </Button>
          </Grid>

          <Typography variant="h6">Advanced Examples</Typography>
          <Grid columns={{ mobile: 1, tablet: 3, desktop: 3 }} gap={12}>
            <Button
              variant="primary"
              size="sm"
              onClick={() => showSuccess(t('demo.toast.quick'), { duration: 1000 })}
            >
              {t('demo.toast.quick')}
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => showInfo(t('demo.toast.long'), { duration: 10000 })}
            >
              {t('demo.toast.long')}
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => showError(t('demo.toast.noAutoClose'), { duration: 0 })}
            >
              {t('demo.toast.noAutoClose')}
            </Button>
          </Grid>
        </Flex>
      </Card>

      {/* 8. Modal Demo */}
      <Card variant="elevated" padding="lg">
        <Flex direction="column" gap={16}>
          <Typography variant="h4">{t('demo.modal.title')}</Typography>
          <Typography variant="body2" color="text-secondary">
            {t('demo.modal.description')}
          </Typography>

          <Grid columns={{ mobile: 1, tablet: 3, desktop: 3 }} gap={12}>
            <Button variant="primary" onClick={() => setIsModalOpen(true)}>
              {t('demo.modal.openModal')}
            </Button>
            <Button variant="secondary" onClick={() => setIsConfirmModalOpen(true)}>
              {t('demo.modal.confirmAction')}
            </Button>
            <Button variant="link" onClick={() => setIsFormModalOpen(true)}>
              {t('demo.modal.withForm')}
            </Button>
          </Grid>

          {/* Simple Modal */}
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={t('demo.modal.modalTitle')}
          >
            <Flex direction="column" gap={16}>
              <Typography variant="body1">{t('demo.modal.modalContent')}</Typography>
              <Flex direction="row" gap={12} justify="end">
                <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                  {t('common.close')}
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    setIsModalOpen(false);
                    showSuccess(t('common.success'));
                  }}
                >
                  {t('common.save')}
                </Button>
              </Flex>
            </Flex>
          </Modal>

          {/* Confirm Modal */}
          <Modal
            isOpen={isConfirmModalOpen}
            onClose={() => setIsConfirmModalOpen(false)}
            title={t('demo.modal.confirmAction')}
          >
            <Flex direction="column" gap={16}>
              <Typography variant="body1">{t('demo.modal.confirmMessage')}</Typography>
              <Flex direction="row" gap={12} justify="end">
                <Button variant="secondary" onClick={() => setIsConfirmModalOpen(false)}>
                  {t('common.cancel')}
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    setIsConfirmModalOpen(false);
                    showSuccess(t('demo.modal.confirm'));
                  }}
                >
                  {t('demo.modal.confirm')}
                </Button>
              </Flex>
            </Flex>
          </Modal>

          {/* Form Modal */}
          <Modal
            isOpen={isFormModalOpen}
            onClose={() => setIsFormModalOpen(false)}
            title={t('demo.modal.withForm')}
          >
            <Flex direction="column" gap={16}>
              <FormField label={t('demo.forms.username')} required>
                <Input
                  value={formUsername}
                  onChange={(e) => setFormUsername(e.target.value)}
                  placeholder={t('demo.forms.username')}
                  fullWidth
                />
              </FormField>

              <FormField 
                label={t('demo.forms.email')} 
                required 
                error={formEmail.length > 0 && !formEmail.includes('@') ? t('demo.forms.invalidEmail') : undefined}
              >
                <Input
                  type="email"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  placeholder={t('demo.forms.email')}
                  error={formEmail.length > 0 && !formEmail.includes('@')}
                  fullWidth
                />
              </FormField>

              <Flex direction="row" gap={12} justify="end">
                <Button
                  variant="secondary"
                  onClick={() => {
                    setIsFormModalOpen(false);
                    setFormUsername('');
                    setFormEmail('');
                  }}
                >
                  {t('common.cancel')}
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    if (formUsername && formEmail.includes('@')) {
                      setIsFormModalOpen(false);
                      showSuccess(`${t('common.success')}: ${formUsername}`);
                      setFormUsername('');
                      setFormEmail('');
                    } else {
                      showError(t('demo.forms.required'));
                    }
                  }}
                >
                  {t('common.submit')}
                </Button>
              </Flex>
            </Flex>
          </Modal>
        </Flex>
      </Card>

      {/* 9. Loading Spinner Demo */}
      <Card variant="elevated" padding="lg">
        <Flex direction="column" gap={16}>
          <Typography variant="h4">{t('demo.loading.title')}</Typography>
          <Typography variant="body2" color="text-secondary">
            {t('demo.loading.description')}
          </Typography>

          <Grid columns={{ mobile: 2, tablet: 4, desktop: 4 }} gap={16}>
            <Card variant="outlined" padding="md">
              <Flex direction="column" gap={12} align="center">
                <Typography variant="body2">{t('demo.loading.defaultSpinner')}</Typography>
                <LoadingSpinner />
              </Flex>
            </Card>

            <Card variant="outlined" padding="md">
              <Flex direction="column" gap={12} align="center">
                <Typography variant="body2">{t('demo.loading.smallSpinner')}</Typography>
                <LoadingSpinner size="sm" />
              </Flex>
            </Card>

            <Card variant="outlined" padding="md">
              <Flex direction="column" gap={12} align="center">
                <Typography variant="body2">{t('demo.loading.largeSpinner')}</Typography>
                <LoadingSpinner size="lg" />
              </Flex>
            </Card>

            <Card variant="outlined" padding="md">
              <Flex direction="column" gap={12} align="center">
                <Typography variant="body2">{t('demo.loading.withText')}</Typography>
                <Flex direction="column" gap={8} align="center">
                  <LoadingSpinner />
                  <Typography variant="body2">{t('demo.loading.loadingText')}</Typography>
                </Flex>
              </Flex>
            </Card>
          </Grid>

          <Button
            variant="primary"
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => {
                setIsLoading(false);
                showSuccess(t('common.success'));
              }, 2000);
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <Flex direction="row" gap={8} align="center">
                <LoadingSpinner size="sm" />
                <span>{t('demo.loading.loadingText')}</span>
              </Flex>
            ) : (
              t('demo.loading.simulateLoading')
            )}
          </Button>
        </Flex>
      </Card>

      {/* 10. Form Fields Demo */}
      <Card variant="elevated" padding="lg">
        <Flex direction="column" gap={16}>
          <Typography variant="h4">{t('demo.forms.title')}</Typography>
          <Typography variant="body2" color="text-secondary">
            {t('demo.forms.description')}
          </Typography>

          <Grid columns={{ mobile: 1, tablet: 2, desktop: 2 }} gap={16}>
            <FormField label={t('demo.forms.username')} required>
              <Input placeholder={t('demo.forms.username')} fullWidth />
            </FormField>

            <FormField label={t('demo.forms.email')} required error={t('demo.forms.invalidEmail')}>
              <Input type="email" placeholder={t('demo.forms.email')} error fullWidth />
            </FormField>

            <FormField label={t('demo.forms.password')} required>
              <Input type="password" placeholder={t('demo.forms.password')} fullWidth />
            </FormField>

            <FormField label={t('common.select')}>
              <Select 
                options={roleOptions} 
                placeholder={t('common.select')} 
                searchable
                fullWidth 
              />
            </FormField>
          </Grid>

          <FormField label={t('demo.forms.message')}>
            <Textarea placeholder={t('demo.forms.message')} rows={4} fullWidth />
          </FormField>
        </Flex>
      </Card>

      {/* 11. Checkbox, Radio, Switch Demo */}
      <Card variant="elevated" padding="lg">
        <Flex direction="column" gap={16}>
          <Typography variant="h4">{t('demo.selections.title')}</Typography>
          <Typography variant="body2" color="text-secondary">
            {t('demo.selections.description')}
          </Typography>

          <Grid columns={{ mobile: 1, tablet: 3, desktop: 3 }} gap={24}>
            {/* Checkbox */}
            <Flex direction="column" gap={12}>
              <Typography variant="h6">{t('demo.selections.checkbox')}</Typography>
              <Checkbox
                label={t('demo.selections.checkboxLabel')}
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
              <Checkbox
                label={t('demo.selections.checkboxIndeterminate')}
                indeterminate={isIndeterminate}
                onChange={(e) => setIsIndeterminate(!e.target.checked)}
              />
              <Checkbox label="Disabled" disabled />
              <Checkbox label="Checked & Disabled" checked disabled />
            </Flex>

            {/* Radio */}
            <Flex direction="column" gap={12}>
              <Typography variant="h6">{t('demo.selections.radio')}</Typography>
              <Radio
                name="radio-group"
                label={t('demo.selections.radioOption1')}
                value="option1"
                checked={selectedRadio === 'option1'}
                onChange={(e) => setSelectedRadio(e.target.value)}
              />
              <Radio
                name="radio-group"
                label={t('demo.selections.radioOption2')}
                value="option2"
                checked={selectedRadio === 'option2'}
                onChange={(e) => setSelectedRadio(e.target.value)}
              />
              <Radio
                name="radio-group"
                label={t('demo.selections.radioOption3')}
                value="option3"
                checked={selectedRadio === 'option3'}
                onChange={(e) => setSelectedRadio(e.target.value)}
              />
              <Radio name="radio-disabled" label="Disabled" disabled />
            </Flex>

            {/* Switch */}
            <Flex direction="column" gap={12}>
              <Typography variant="h6">{t('demo.selections.switch')}</Typography>
              <Switch
                label={t('demo.selections.switchLabel')}
                checked={isSwitchOn}
                onChange={(e) => setIsSwitchOn(e.target.checked)}
              />
              <Switch label={t('demo.selections.switchSmall')} size="sm" />
              <Switch label={t('demo.selections.switchMedium')} size="md" />
              <Switch label={t('demo.selections.switchLarge')} size="lg" />
              <Switch label="Disabled" disabled />
            </Flex>
          </Grid>
        </Flex>
      </Card>

      {/* 12. Tabs Demo */}
      <Card variant="elevated" padding="lg">
        <Flex direction="column" gap={16}>
          <Typography variant="h4">{t('demo.tabs.title')}</Typography>
          <Typography variant="body2" color="text-secondary">
            {t('demo.tabs.description')}
          </Typography>

          <Tabs
            tabs={[
              {
                id: 'profile',
                label: t('demo.tabs.tab1'),
                content: (
                  <Card variant="outlined" padding="md">
                    <Typography variant="body1">{t('demo.tabs.tab1Content')}</Typography>
                  </Card>
                ),
              },
              {
                id: 'settings',
                label: t('demo.tabs.tab2'),
                content: (
                  <Card variant="outlined" padding="md">
                    <Typography variant="body1">{t('demo.tabs.tab2Content')}</Typography>
                  </Card>
                ),
              },
              {
                id: 'notifications',
                label: t('demo.tabs.tab3'),
                content: (
                  <Card variant="outlined" padding="md">
                    <Typography variant="body1">{t('demo.tabs.tab3Content')}</Typography>
                  </Card>
                ),
              },
            ]}
          />

          <Typography variant="h6">{t('demo.tabs.pillsVariant')}</Typography>
          <Tabs
            variant="pills"
            tabs={[
              {
                id: 'tab1',
                label: t('demo.tabs.tab1'),
                content: <Typography variant="body1">{t('demo.tabs.tab1Content')}</Typography>,
              },
              {
                id: 'tab2',
                label: t('demo.tabs.tab2'),
                content: <Typography variant="body1">{t('demo.tabs.tab2Content')}</Typography>,
              },
              {
                id: 'tab3',
                label: t('demo.tabs.tab3'),
                content: <Typography variant="body1">{t('demo.tabs.tab3Content')}</Typography>,
              },
            ]}
          />
        </Flex>
      </Card>

      {/* 13. Badges Demo */}
      <Card variant="elevated" padding="lg">
        <Flex direction="column" gap={16}>
          <Typography variant="h4">{t('demo.badges.title')}</Typography>
          <Typography variant="body2" color="text-secondary">
            {t('demo.badges.description')}
          </Typography>

          <Flex direction="column" gap={16}>
            <Flex direction="row" gap={12} wrap="wrap" align="center">
              <Badge variant="primary">{t('demo.badges.primary')}</Badge>
              <Badge variant="secondary">{t('demo.badges.secondary')}</Badge>
              <Badge variant="success">{t('demo.badges.success')}</Badge>
              <Badge variant="error">{t('demo.badges.error')}</Badge>
              <Badge variant="warning">{t('demo.badges.warning')}</Badge>
              <Badge variant="info">{t('demo.badges.info')}</Badge>
            </Flex>

            <Typography variant="h6">{t('demo.badges.sizes')}</Typography>
            <Flex direction="row" gap={12} wrap="wrap" align="center">
              <Badge size="sm">Small</Badge>
              <Badge size="md">Medium</Badge>
              <Badge size="lg">Large</Badge>
            </Flex>

            <Typography variant="h6">{t('demo.badges.dot')}</Typography>
            <Flex direction="row" gap={12} wrap="wrap" align="center">
              <Badge variant="success" dot />
              <Badge variant="error" dot />
              <Badge variant="warning" dot />
              <Badge variant="info" dot />
            </Flex>
          </Flex>
        </Flex>
      </Card>

      {/* 14. Avatars Demo */}
      <Card variant="elevated" padding="lg">
        <Flex direction="column" gap={16}>
          <Typography variant="h4">{t('demo.avatars.title')}</Typography>
          <Typography variant="body2" color="text-secondary">
            {t('demo.avatars.description')}
          </Typography>

          <Flex direction="column" gap={16}>
            <Typography variant="h6">{t('demo.avatars.withInitials')}</Typography>
            <Flex direction="row" gap={12} wrap="wrap" align="center">
              <Avatar name="John Doe" />
              <Avatar name="Jane Smith" />
              <Avatar name="Bob Johnson" />
            </Flex>

            <Typography variant="h6">{t('demo.avatars.sizes')}</Typography>
            <Flex direction="row" gap={12} wrap="wrap" align="center">
              <Avatar name="JD" size="sm" />
              <Avatar name="JD" size="md" />
              <Avatar name="JD" size="lg" />
              <Avatar name="JD" size="xl" />
            </Flex>

            <Typography variant="h6">{t('demo.avatars.variants')}</Typography>
            <Flex direction="row" gap={12} wrap="wrap" align="center">
              <Avatar name="JD" variant="circular" />
              <Avatar name="JD" variant="rounded" />
              <Avatar name="JD" variant="square" />
            </Flex>
          </Flex>
        </Flex>
      </Card>

      {/* 15. Tooltips Demo */}
      <Card variant="elevated" padding="lg">
        <Flex direction="column" gap={16}>
          <Typography variant="h4">{t('demo.tooltips.title')}</Typography>
          <Typography variant="body2" color="text-secondary">
            {t('demo.tooltips.description')}
          </Typography>

          <Grid columns={{ mobile: 2, tablet: 4, desktop: 4 }} gap={16}>
            <Tooltip content={t('demo.tooltips.tooltipText')} placement="top">
              <Button variant="secondary">{t('demo.tooltips.top')}</Button>
            </Tooltip>
            <Tooltip content={t('demo.tooltips.tooltipText')} placement="bottom">
              <Button variant="secondary">{t('demo.tooltips.bottom')}</Button>
            </Tooltip>
            <Tooltip content={t('demo.tooltips.tooltipText')} placement="left">
              <Button variant="secondary">{t('demo.tooltips.left')}</Button>
            </Tooltip>
            <Tooltip content={t('demo.tooltips.tooltipText')} placement="right">
              <Button variant="secondary">{t('demo.tooltips.right')}</Button>
            </Tooltip>
          </Grid>
        </Flex>
      </Card>

      {/* 16. Responsive Info */}
      <Card variant="outlined" padding="md">
        <Flex direction="column" gap={12}>
          <Typography variant="h5">{t('demo.responsive.title')}</Typography>
          <Typography variant="body2" color="text-secondary">
            {t('demo.responsive.description')}
          </Typography>
          <Card variant="filled" padding="md">
            <Typography variant="h6">{t('demo.responsive.currentDevice')}:</Typography>
            <Typography variant="body1" color="text-secondary">
              {isMobile && t('demo.responsive.mobile')}
              {isTablet && t('demo.responsive.tablet')}
              {isDesktop && t('demo.responsive.desktop')}
            </Typography>
          </Card>
          <Button
            variant="secondary"
            size="sm"
            onClick={() =>
              showInfo(
                `${t('demo.responsive.currentDevice')}: ${
                  isMobile
                    ? t('demo.responsive.mobile')
                    : isTablet
                    ? t('demo.responsive.tablet')
                    : t('demo.responsive.desktop')
                }`
              )
            }
          >
            {t('demo.responsive.showDevice')}
          </Button>
        </Flex>
      </Card>

      {/* 17. Features Grid */}
      <Card variant="elevated" padding="lg">
        <Flex direction="column" gap={16}>
          <Typography variant="h4">{t('demo.features.title')}</Typography>
          <Grid columns={{ mobile: 1, tablet: 2, desktop: 4 }} gap={16}>
            <Card variant="outlined" padding="md">
              <Typography variant="h6">{t('demo.features.theming.title')}</Typography>
              <Typography variant="body2" color="text-secondary">
                {t('demo.features.theming.description')}
              </Typography>
            </Card>
            <Card variant="outlined" padding="md">
              <Typography variant="h6">{t('demo.features.responsive.title')}</Typography>
              <Typography variant="body2" color="text-secondary">
                {t('demo.features.responsive.description')}
              </Typography>
            </Card>
            <Card variant="outlined" padding="md">
              <Typography variant="h6">{t('demo.features.i18n.title')}</Typography>
              <Typography variant="body2" color="text-secondary">
                {t('demo.features.i18n.description')}
              </Typography>
            </Card>
            <Card variant="outlined" padding="md">
              <Typography variant="h6">{t('demo.features.redux.title')}</Typography>
              <Typography variant="body2" color="text-secondary">
                {t('demo.features.redux.description')}
              </Typography>
            </Card>
          </Grid>
        </Flex>
      </Card>

      {/* 18. Data Table Demo */}
      <Card variant="elevated" padding="lg">
        <Flex direction="column" gap={16}>
          <Typography variant="h4">{t('components.table.title')}</Typography>
          <Typography variant="body2" color="text-secondary">
            {t('components.table.description')}
          </Typography>

          <DataTable
            columns={[
              { id: 'name', label: 'Name', sortable: true },
              { id: 'role', label: 'Role', sortable: true },
              { id: 'email', label: 'Email' },
              {
                id: 'status',
                label: 'Status',
                render: (row) => (
                  <Badge variant={row.status === 'Active' ? 'success' : 'secondary'}>
                    {row.status as string}
                  </Badge>
                ),
              },
            ]}
            data={[
              { name: 'John Doe', role: 'Admin', email: 'john@example.com', status: 'Active' },
              { name: 'Jane Smith', role: 'User', email: 'jane@example.com', status: 'Active' },
              { name: 'Bob Johnson', role: 'User', email: 'bob@example.com', status: 'Inactive' },
              { name: 'Alice Williams', role: 'Moderator', email: 'alice@example.com', status: 'Active' },
              { name: 'Charlie Brown', role: 'User', email: 'charlie@example.com', status: 'Active' },
            ]}
            sortable
            pagination
            defaultPageSize={3}
            onRowClick={(row) => showInfo(`Clicked: ${row.name as string}`)}
          />
        </Flex>
      </Card>

      {/* 19. Skeleton Demo */}
      <Card variant="elevated" padding="lg">
        <Flex direction="column" gap={16}>
          <Typography variant="h4">{t('components.skeleton.title')}</Typography>
          <Typography variant="body2" color="text-secondary">
            {t('components.skeleton.description')}
          </Typography>

          <Button
            variant="primary"
            onClick={() => {
              setShowSkeleton(true);
              setTimeout(() => setShowSkeleton(false), 2000);
            }}
          >
            Show Skeleton Loading
          </Button>

          <Grid columns={{ mobile: 1, tablet: 3, desktop: 3 }} gap={16}>
            <Card variant="outlined" padding="md">
              <Flex direction="column" gap={8}>
                <Typography variant="h6">{t('components.skeleton.text')}</Typography>
                {showSkeleton ? (
                  <Skeleton variant="text" count={3} />
                ) : (
                  <>
                    <Typography variant="body2">This is line 1</Typography>
                    <Typography variant="body2">This is line 2</Typography>
                    <Typography variant="body2">This is line 3</Typography>
                  </>
                )}
              </Flex>
            </Card>

            <Card variant="outlined" padding="md">
              <Flex direction="column" gap={8} align="center">
                <Typography variant="h6">{t('components.skeleton.circular')}</Typography>
                {showSkeleton ? (
                  <Skeleton variant="circular" width={80} height={80} />
                ) : (
                  <Avatar name="John Doe" size="xl" />
                )}
              </Flex>
            </Card>

            <Card variant="outlined" padding="md">
              <Flex direction="column" gap={8}>
                <Typography variant="h6">{t('components.skeleton.rectangular')}</Typography>
                {showSkeleton ? (
                  <Skeleton variant="rectangular" height={100} animation="wave" />
                ) : (
                  <Card variant="filled" padding="md">
                    <Typography variant="body2">Content loaded!</Typography>
                  </Card>
                )}
              </Flex>
            </Card>
          </Grid>
        </Flex>
      </Card>

      {/* 20. Breadcrumbs Demo */}
      <Card variant="elevated" padding="lg">
        <Flex direction="column" gap={16}>
          <Typography variant="h4">{t('components.breadcrumbs.title')}</Typography>
          <Typography variant="body2" color="text-secondary">
            {t('components.breadcrumbs.description')}
          </Typography>

          <Flex direction="column" gap={12}>
            <Breadcrumbs
              items={[
                { label: t('components.breadcrumbs.home'), onClick: () => showInfo('Home') },
                { label: t('components.breadcrumbs.products'), onClick: () => showInfo('Products') },
                { label: t('components.breadcrumbs.category'), onClick: () => showInfo('Category') },
                { label: t('components.breadcrumbs.item') },
              ]}
            />

            <Breadcrumbs
              items={[
                { label: t('components.breadcrumbs.home') },
                { label: t('components.breadcrumbs.products') },
                { label: 'Electronics' },
                { label: 'Computers' },
                { label: 'Laptops' },
                { label: 'Gaming' },
                { label: 'Current Item' },
              ]}
              maxItems={4}
              separator="›"
            />
          </Flex>
        </Flex>
      </Card>

      {/* 21. Accordion Demo */}
      <Card variant="elevated" padding="lg">
        <Flex direction="column" gap={16}>
          <Typography variant="h4">{t('components.accordion.title')}</Typography>
          <Typography variant="body2" color="text-secondary">
            {t('components.accordion.description')}
          </Typography>

          <Grid columns={{ mobile: 1, tablet: 2, desktop: 2 }} gap={16}>
            <Flex direction="column" gap={8}>
              <Typography variant="h6">Default Variant</Typography>
              <Accordion
                items={[
                  {
                    id: '1',
                    title: t('components.accordion.section1'),
                    content: t('components.accordion.content'),
                  },
                  {
                    id: '2',
                    title: t('components.accordion.section2'),
                    content: t('components.accordion.content'),
                  },
                  {
                    id: '3',
                    title: t('components.accordion.section3'),
                    content: t('components.accordion.content'),
                  },
                ]}
                defaultExpanded={['1']}
              />
            </Flex>

            <Flex direction="column" gap={8}>
              <Typography variant="h6">Bordered Variant</Typography>
              <Accordion
                items={[
                  {
                    id: '1',
                    title: t('components.accordion.section1'),
                    content: t('components.accordion.content'),
                  },
                  {
                    id: '2',
                    title: t('components.accordion.section2'),
                    content: t('components.accordion.content'),
                  },
                  {
                    id: '3',
                    title: t('components.accordion.section3'),
                    content: t('components.accordion.content'),
                    disabled: true,
                  },
                ]}
                variant="bordered"
                allowMultiple
              />
            </Flex>
          </Grid>
        </Flex>
      </Card>

      {/* 22. DatePicker Demo */}
      <Card variant="elevated" padding="lg">
        <Flex direction="column" gap={16}>
          <Typography variant="h4">{t('components.datePicker.title')}</Typography>
          <Typography variant="body2" color="text-secondary">
            {t('components.datePicker.description')}
          </Typography>

          <Grid columns={{ mobile: 1, tablet: 2, desktop: 2 }} gap={16}>
            <DatePicker
              label={t('components.datePicker.selectDate')}
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                if (e.target.value) {
                  showSuccess(`Selected: ${e.target.value}`);
                }
              }}
              className="w-full"
            />

            <DatePicker
              label={t('components.datePicker.startDate')}
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                if (e.target.value) {
                  showInfo(`Start: ${e.target.value}`);
                }
              }}
              maxDate={new Date().toISOString().split('T')[0]}
              className="w-full"
            />
          </Grid>
        </Flex>
      </Card>

      {/* 23. Slider Demo */}
      <Card variant="elevated" padding="lg">
        <Flex direction="column" gap={16}>
          <Typography variant="h4">{t('components.slider.title')}</Typography>
          <Typography variant="body2" color="text-secondary">
            {t('components.slider.description')}
          </Typography>

          <Grid columns={{ mobile: 1, tablet: 2, desktop: 2 }} gap={24}>
            <div style={{ minWidth: 0 }}>
              <Slider
                label={`${t('components.slider.volume')}: ${sliderValue}%`}
                value={sliderValue}
                onChange={setSliderValue}
              />
            </div>

            <div style={{ minWidth: 0 }}>
              <Slider
                label={`${t('components.slider.temperature')}: ${temperatureValue}°C`}
                value={temperatureValue}
                onChange={setTemperatureValue}
                min={0}
                max={100}
                color="secondary"
              />
            </div>
          </Grid>
        </Flex>
      </Card>

      {/* 24. ProgressBar Demo */}
      <Card variant="elevated" padding="lg">
        <Flex direction="column" gap={16}>
          <Typography variant="h4">{t('components.progressBar.title')}</Typography>
          <Typography variant="body2" color="text-secondary">
            {t('components.progressBar.description')}
          </Typography>

          <Flex direction="column" gap={16}>
            <Flex direction="column" gap={8}>
              <Typography variant="body2">{t('components.progressBar.default')}</Typography>
              <ProgressBar value={75} showLabel />
            </Flex>

            <Flex direction="column" gap={8}>
              <Typography variant="body2">{t('components.progressBar.success')}</Typography>
              <ProgressBar value={100} variant="success" showLabel />
            </Flex>

            <Flex direction="column" gap={8}>
              <Typography variant="body2">{t('components.progressBar.warning')}</Typography>
              <ProgressBar value={45} variant="warning" showLabel striped />
            </Flex>

            <Flex direction="column" gap={8}>
              <Typography variant="body2">{t('components.progressBar.error')}</Typography>
              <ProgressBar value={25} variant="error" showLabel striped animated />
            </Flex>

            <Flex direction="column" gap={8}>
              <Typography variant="body2">Large Size</Typography>
              <ProgressBar value={60} variant="info" size="lg" showLabel />
            </Flex>
          </Flex>
        </Flex>
      </Card>

      {/* 25. User List Widget Example */}
      <UserList />
    </Flex>
  );
};
