import { GroupProps } from "react-three-fiber";
import SpeechBubble from "../../../components/SpeechBubble";

const GiveCode = (props: GroupProps) => {
  return (
    <group {...props}>
      <group position-y={1} position-z={0.2}>
        <SpeechBubble>
          good shit, type in this code at checkout: SILKY22
        </SpeechBubble>
      </group>
    </group>
  );
};

export default GiveCode;

// https://a.klaviyo.com/ajax/subscriptions/subscribe

// g=VJf4Gx&%24fields=%24source%2C%24email%2C%24consent_method%2C%24consent_form_id%2C%24consent_form_version&%24list_fields=&%24timezone_offset=-7&%24source=asdf&%24email=alexander.shortt%40gmail.com&%24consent_method=Klaviyo+Form&%24consent_form_id=SfzZZK&%24consent_form_version=2512582
