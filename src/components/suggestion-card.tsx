import { StartsLogo } from "../assets/svg/svg";

interface SuggestionCardProps {
  title: string;
  index: number;
}
const SuggestionCard: React.FC<SuggestionCardProps> = ({ title, index }) => {
  return (
    <>
      <div key={index} className="relative">
        <div className="flex flex-col items-center justify-between h-full min-h-56 w-full p-4 rounded-2xl bg-linear-to-r from-pink-50 to-blue-50  border-gray-200 cursor-pointer hover:border-blue-500 hover:border transition-all">
          <div className="flex items-start justify-center">
            <div className="flex items-center justify-center p-2 h-12 w-12 bg-gray-50 border-2 border-gray-200 rounded-full absolute left-2 right-2 top-2">
              <StartsLogo />
            </div>
          </div>
          <div className="text-sm font-medium text-gray-900 leading-relaxed">
            {title}
          </div>
        </div>
      </div>
    </>
  );
};

export default SuggestionCard;
