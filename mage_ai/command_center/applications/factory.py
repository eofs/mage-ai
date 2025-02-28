import os
from datetime import datetime
from typing import Dict, List

from mage_ai.command_center.applications.constants import ITEMS
from mage_ai.command_center.constants import ItemType, ObjectType
from mage_ai.command_center.factory import DEFAULT_RATIO, BaseFactory


class ApplicationFactory(BaseFactory):
    async def fetch_items(self, **kwargs) -> List[Dict]:
        items = []

        for item_dict in (self.page_history or []):
            item_scored = self.filter_score(item_dict)
            if item_scored:
                items.append(item_scored)

        for item in ITEMS:
            item_dict = dict(
                item_type=ItemType.NAVIGATE,
                object_type=ObjectType.APPLICATION,
                title=item.get('title'),
                description=item.get('path').strip(os.path.sep),
                display_settings_by_attribute=dict(
                    description=dict(
                        text_styles=dict(
                            monospace=True,
                            small=True,
                        ),
                    ),
                ),
                condition=item.get('condition'),
                actions=[
                    dict(
                        page=dict(
                            path=item.get('path'),
                        ),
                        uuid=item.get('title'),
                    ),
                ],
            )
            item_scored = self.filter_score(item_dict)
            if item_scored:
                items.append(item_scored)

        return items

    def score_item(self, item_dict: Dict, score: int = None) -> int:
        timestamp = ((item_dict.get('metadata') or {}).get('page') or {}).get('timestamp')
        if timestamp:
            now = datetime.utcnow().timestamp()
            return score + (DEFAULT_RATIO * (now / timestamp))
        return score
