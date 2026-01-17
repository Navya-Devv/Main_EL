import pandas as pd
import numpy as np
import random

# Load the original clean dataset
df = pd.read_csv('placement.csv')

# Create a copy to mess up
dirty_df = df.copy()

# --- 1. Structural/Schema Chaos ---
# Add a column that shouldn't be there (noise)
dirty_df['Unnamed: 12'] = np.nan 

# --- 2. Heavy Missing Values (20%) ---
cols_to_nan = dirty_df.columns
for col in cols_to_nan:
    mask = np.random.random(len(dirty_df)) < 0.20
    dirty_df.loc[mask, col] = np.nan

# --- 3. Severe Categorical Inconsistency ---
# PlacementStatus: Mix of synonyms, case, and completely wrong labels
status_mess = [
    'Placed', 'placed', 'PLACED', 'P', 'Yes', 'Job', 'Employed',
    'NotPlaced', 'Not Placed', 'Unplaced', 'NP', 'No', 'Idle', 'Unemployed'
]
dirty_df['PlacementStatus'] = dirty_df['PlacementStatus'].apply(
    lambda x: np.random.choice(status_mess) if pd.notnull(x) and np.random.random() > 0.3 else x
)

# Binary columns: Mix 0/1, T/F, Y/N, Yes/No
binary_mess = ['Yes', 'yes', 'Y', 'True', 'T', '1', 'No', 'no', 'N', 'False', 'F', '0']
dirty_df['ExtracurricularActivities'] = dirty_df['ExtracurricularActivities'].apply(
    lambda x: np.random.choice(binary_mess) if pd.notnull(x) and np.random.random() > 0.3 else x
)

# --- 4. Numerical Corruption (Strings in Numbers) ---
# CGPA: Replace numbers with word representations or ranges
def mess_cgpa(x):
    if pd.isna(x): return x
    r = np.random.random()
    if r < 0.05: return f"approx {x}"
    if r < 0.10: return f"{x}/10"
    if r < 0.15: return x * 10  # Scale error (e.g., 85 instead of 8.5)
    if r < 0.20: return -x      # Negative error
    if r < 0.25: return "missing"
    return x

dirty_df['CGPA'] = dirty_df['CGPA'].apply(mess_cgpa)

# AptitudeTestScore: Add units, typos
def mess_aptitude(x):
    if pd.isna(x): return x
    r = np.random.random()
    if r < 0.1: return f"{x}%"
    if r < 0.2: return f"Score: {x}"
    if r < 0.3: return -1
    return x
dirty_df['AptitudeTestScore'] = dirty_df['AptitudeTestScore'].apply(mess_aptitude)

# --- 5. Mixed Data Types ---
# Internships: Convert numbers to words for some
num_to_word = {0: 'Zero', 1: 'One', 2: 'Two', 3: 'Three'}
def mess_internships(x):
    if pd.isna(x): return x
    if x in num_to_word and np.random.random() < 0.3:
        return num_to_word[x]
    return x
dirty_df['Internships'] = dirty_df['Internships'].apply(mess_internships)

# --- 6. Data Shifting (Simulating parsing errors) ---
# For 1% of rows, shift values from column 'SSC_Marks' to 'HSC_Marks' (overwriting) 
# and put garbage in 'SSC_Marks'
indices_to_shift = dirty_df.sample(frac=0.01).index
dirty_df.loc[indices_to_shift, 'HSC_Marks'] = dirty_df.loc[indices_to_shift, 'SSC_Marks']
dirty_df.loc[indices_to_shift, 'SSC_Marks'] = "DATA_SHIFT_ERROR"

# --- 7. Formatting Issues ---
# Add whitespace padding to strings
dirty_df['PlacementStatus'] = dirty_df['PlacementStatus'].apply(lambda x: f" {x} " if isinstance(x, str) else x)

# --- 8. Duplicates ---
# Add significant duplication
dirty_df = pd.concat([dirty_df, dirty_df.sample(frac=0.15)], ignore_index=True)

# --- 9. Shuffle ---
dirty_df = dirty_df.sample(frac=1).reset_index(drop=True)

# Save
dirty_filename = 'very_dirty_placement.csv'
dirty_df.to_csv(dirty_filename, index=False)