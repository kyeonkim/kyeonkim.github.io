#!/bin/bash

# 폴더 목록 배열
FOLDERS=("algorithms" "blog" "computer-networks" "data-structures" "database" "operating-systems" "projects" "tech")

# 사용자에게 선택지 제공
echo "어느 폴더에 .md 파일을 생성하시겠습니까?"
for i in "${!FOLDERS[@]}"; do
    echo "$((i+1)). ${FOLDERS[$i]}"
done

# 사용자 입력 받기
read -p "번호를 입력하세요: " choice

# 입력 값 검증
if [[ "$choice" =~ ^[0-9]+$ ]] && (( choice >= 1 && choice <= ${#FOLDERS[@]} )); then
    SELECTED_FOLDER="_posts/${FOLDERS[$((choice-1))]}"
    DATE=$(date +"%Y-%m-%d")
    FILE_NAME="$SELECTED_FOLDER/${DATE}-${FOLDERS[$((choice-1))]}.md"
    
    # 파일 생성 및 기본 내용 추가
    if [[ ! -d "$SELECTED_FOLDER" ]]; then
        mkdir -p "$SELECTED_FOLDER"
    fi
    
    touch "$FILE_NAME"
    echo "---" >> "$FILE_NAME"
    echo "title: " >> "$FILE_NAME"
    echo "excerpt: " >> "$FILE_NAME"
    echo "" >> "$FILE_NAME"
    echo "categories:" >> "$FILE_NAME"
    CATEGORY_NAME=$(echo "${FOLDERS[$((choice-1))]}" | sed -E 's/-/ /g' | awk '{for(i=1;i<=NF;++i) $i=toupper(substr($i,1,1)) tolower(substr($i,2)); print}')
echo "  - $CATEGORY_NAME" >> "$FILE_NAME"
    echo "tags:" >> "$FILE_NAME"
    echo "  - []" >> "$FILE_NAME"
    echo "" >> "$FILE_NAME"
    echo "permalink: /${FOLDERS[$((choice-1))]}/${FOLDERS[$((choice-1))]}-start/" >> "$FILE_NAME"
    echo "" >> "$FILE_NAME"
    echo "toc: true" >> "$FILE_NAME"
    echo "toc_sticky: true" >> "$FILE_NAME"
    echo "" >> "$FILE_NAME"
    echo "date: $DATE" >> "$FILE_NAME"
    echo "last_modified_at: $DATE" >> "$FILE_NAME"
    echo "---" >> "$FILE_NAME"
    echo "\n# 제목을 입력하세요" >> "$FILE_NAME"
    
    echo "파일이 생성되었습니다: $FILE_NAME"
else
    echo "잘못된 입력입니다. 다시 실행해주세요."
    exit 1
fi
