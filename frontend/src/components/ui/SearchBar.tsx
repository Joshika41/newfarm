import React, { useCallback } from 'react';
import { View, TextInput, ScrollView, Pressable, Text } from 'react-native';
import { Search, X, Bird, Fish, Milk, ShieldAlert, Truck, Wrench, Heart, Waves } from 'lucide-react-native';
import { useTheme } from '../../hooks/useTheme';
import { TaskCategory } from '../../types';

interface SearchBarProps {
  query: string;
  onQueryChange: (text: string) => void;
  selectedCategory: TaskCategory | null;
  onCategoryChange: (category: TaskCategory | null) => void;
  placeholder?: string;
  allowedCategories?: TaskCategory[];
}

const CATEGORIES: { id: TaskCategory; label: string; icon: any; color: string; bg: string }[] = [
  { id: 'birds',       label: 'Birds',       icon: Bird,        color: '#D84315', bg: '#FBE9E7' },
  { id: 'fish',        label: 'Fish',        icon: Fish,        color: '#0277BD', bg: '#E1F5FE' },
  { id: 'pond',        label: 'Pond',        icon: Waves,       color: '#0097A7', bg: '#E0F7FA' },
  { id: 'health',      label: 'Health Check', icon: Heart,       color: '#00ACC1', bg: '#E0F7FA' },
  { id: 'calves',      label: 'Calves',      icon: Milk,        color: '#6A1B9A', bg: '#F3E5F5' },
  { id: 'cow_shed',    label: 'Cow Shed',    icon: ShieldAlert, color: '#00695C', bg: '#E0F2F1' },
  { id: 'vehicles',    label: 'Vehicles',    icon: Truck,       color: '#37474F', bg: '#ECEFF1' },
  { id: 'maintenance', label: 'Repairs',     icon: Wrench,      color: '#4E342E', bg: '#EFEBE9' },
];

const SearchBarComponent: React.FC<SearchBarProps> = ({
  query,
  onQueryChange,
  selectedCategory,
  onCategoryChange,
  placeholder = 'Search tasks...',
  allowedCategories,
}) => {
  const { colors, isDark } = useTheme();
  const handleClearQuery = useCallback(() => onQueryChange(''), [onQueryChange]);

  const visibleCategories = allowedCategories
    ? CATEGORIES.filter(cat => allowedCategories.includes(cat.id))
    : CATEGORIES;

  return (
    <View style={{ marginBottom: 16 }}>
      {/* Search Input Box */}
      <View 
        style={{ 
          backgroundColor: colors.card,
          borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(45, 90, 39, 0.08)',
          borderWidth: 1,
          flexDirection: 'row',
          alignItems: 'center',
          height: 48,
          borderRadius: 16,
          paddingHorizontal: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: isDark ? 0.2 : 0.04,
          shadowRadius: 6,
          elevation: 2,
        }}
      >
        <Search size={20} color={colors.textSecondary} />
        <TextInput
          value={query}
          onChangeText={onQueryChange}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          style={{ 
            color: colors.text,
            flex: 1,
            marginLeft: 12,
            fontSize: 14,
            fontWeight: '500',
            height: '100%',
          }}
        />
        {query.length > 0 && (
          <Pressable onPress={handleClearQuery} style={{ padding: 4 }}>
            <X size={16} color={colors.textSecondary} />
          </Pressable>
        )}
      </View>

      {/* Categories ScrollView */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 12, flexDirection: 'row' }}
        contentContainerStyle={{ paddingRight: 20, paddingVertical: 2 }}
      >
        <Pressable
          onPress={() => onCategoryChange(null)}
          style={{
            backgroundColor: selectedCategory === null 
              ? colors.primary 
              : colors.card,
            borderColor: selectedCategory === null 
              ? colors.primary
              : isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(45, 90, 39, 0.08)',
            borderWidth: 1,
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 12,
            marginRight: 8,
            flexDirection: 'row',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: isDark ? 0.2 : 0.03,
            shadowRadius: 3,
            elevation: 1,
          }}
        >
          <Text
            style={{
              color: selectedCategory === null 
                ? '#FFFFFF' 
                : colors.text,
              fontSize: 12,
              fontWeight: '700',
            }}
          >
            All Areas
          </Text>
        </Pressable>

        {visibleCategories.map((cat) => {
          const IconComponent = cat.icon;
          const isSelected = selectedCategory === cat.id;
          return (
            <Pressable
              key={cat.id}
              onPress={() => onCategoryChange(isSelected ? null : cat.id)}
              style={{
                backgroundColor: isSelected ? cat.color : colors.card,
                borderColor: isSelected 
                  ? cat.color
                  : isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(45, 90, 39, 0.08)',
                borderWidth: 1,
                paddingHorizontal: 14,
                paddingVertical: 8,
                borderRadius: 12,
                marginRight: 8,
                flexDirection: 'row',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: isDark ? 0.2 : 0.03,
                shadowRadius: 3,
                elevation: 1,
              }}
            >
              <IconComponent 
                size={14} 
                color={isSelected ? '#FFFFFF' : cat.color} 
                style={{ marginRight: 6 }}
              />
              <Text
                style={{
                  color: isSelected ? '#FFFFFF' : colors.text,
                  fontSize: 12,
                  fontWeight: '700',
                }}
              >
                {cat.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

export const SearchBar = React.memo(SearchBarComponent);
