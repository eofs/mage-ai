import Flex from '@oracle/components/Flex';
import FlexContainer from '@oracle/components/FlexContainer';
import KeyboardShortcutButton, {
  KeyTextsPostitionEnum,
} from '@oracle/elements/Button/KeyboardShortcutButton';
import KeyboardShortcutType from '@interfaces/KeyboardShortcutType';
import KeyboardTextGroup from '@oracle/elements/KeyboardTextGroup';
import Spacing from '@oracle/elements/Spacing';
import Text from '@oracle/elements/Text';
import { ApplicationProps } from '../ItemApplication/constants';
import { KEY_CODE_KEY_SYMBOL_MAPPING } from '@utils/hooks/keyboardShortcuts/constants';
import { PADDING_UNITS, UNIT } from '@oracle/styles/units/spacing';
import { executeButtonActions } from '../utils';
import { getIcon } from '../ItemRow/constants';
import { getIconColor } from '../ItemRow/index.style';
import { onlyKeysPresent } from '@utils/hooks/keyboardShortcuts/utils';

function ApplicationFooter({
  application,
  applicationsRef,
  executeAction,
  focusedItemIndex,
  item,
  removeApplication,
  refError,
}: ApplicationProps) {
  const {
    applications,
    title,
  } = item;

  const Icon = getIcon(item);
  const iconColor = getIconColor(item);
  const buttonsCount = application?.buttons?.length ?? 0;

  return (
    <FlexContainer alignItems="center" fullWidth justifyContent="space-between">
      <Flex alignItems="center" flex={1}>
        <Icon
          fill={iconColor?.accent}
          size={2 * UNIT}
        />

        <div style={{ marginRight: 1.5 * UNIT }} />

        <Text default weightStyle={4}>
          {title}
        </Text>

        <Spacing mr={PADDING_UNITS} />
      </Flex>

      <FlexContainer alignItems="center">
        {application?.buttons?.map((button, idx: number) => {
          const {
            display_settings: displaySettings,
            keyboard_shortcuts: keyboardShortcuts,
            label,
            tooltip,
          } = button;
          const colorUUID = displaySettings?.color_uuid;

          return (
            <FlexContainer alignItems="center" key={label}>
              {idx >= 1 && <Spacing mr={PADDING_UNITS} />}

              <KeyboardShortcutButton
                addPlusSignBetweenKeys
                bold
                compact
                default={idx === 0 && buttonsCount >= 2}
                keyTextGroups={keyboardShortcuts?.map(
                  arr => arr?.map(keyCode => KEY_CODE_KEY_SYMBOL_MAPPING[keyCode]),
                )}
                keyTextsPosition={KeyTextsPostitionEnum.RIGHT}
                noBackground={idx === 0 && buttonsCount >= 2}
                onClick={() => executeButtonActions({
                  application,
                  button,
                  executeAction,
                  focusedItemIndex,
                  item,
                  refError,
                  removeApplication,
                })}
                uuid={`${item?.uuid}-${application?.uuid}-${idx}-button`}
              >
                {label}
              </KeyboardShortcutButton>
            </FlexContainer>
          );
        })}
      </FlexContainer>
    </FlexContainer>
  );
}

export default ApplicationFooter;
